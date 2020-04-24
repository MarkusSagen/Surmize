__authors__ = "Markus Sagen, Sebastian Rollino, Nils Hedberg, Alexander Bergkvist"
import os, sys
import shutil
import pandas as pd
from pathlib import Path
import glob
import threading

sys.path.append(os.path.join(sys.path[0],'summarization', 'bertabs'))
sys.path.append(os.path.join(sys.path[0],'summarization', 'bertabs', 'Utility'))

import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi import FastAPI, File, Query, Form, UploadFile, Request, HTTPException
from pydantic import Required, BaseModel
from typing import Callable, List
from enum import Enum
import json

from ast import literal_eval
from tempfile import NamedTemporaryFile
from cdqa.utils.filters import filter_paragraphs
from cdqa.pipeline import QAPipeline
from model import QA

import summarization.bertabs.run_summarization as summarizer
from summarization.bertabs.Utility.clean_directories import clean_directories
from summarization.bertabs.Utility.sum_joiner import sum_joiner
from summarization.bertabs.Utility.text_splitter import text_splitter
from summarization.textrank.text_rank_summarize import text_rank_summarize, word_embeddings

from uuid import UUID, uuid4
import base64


""" 
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'doc', 'docx', 'csv'}
"""

# Model
qa = QA()
word_emb = word_embeddings()

# API
app = FastAPI(
    title="Surmize",
    description="The service to gain insight and understanding in text, documents and more",
    version="0.0.1"
)
origins = [
    "http://localhost",
    "http://localhost:5000",
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

upload_folder = "data/"


# Empty request exception
class EmptyException(Exception):
    def __init__(self, query: str):
        self.name = "'Emtpy'"
        self.query = f"'{query}'"


# Return QA prediction from model
def summarize(upload_folder, summary_path, user, sus_method):
    """
    Summarize TXT file and store summary in new summaries path
    """
    if sus_method == "abs":
        summarizer.main(rDir=upload_folder, sDir=summary_path, \
                        beam=8, alpha=0.75, minl=50, maxl=200)
    elif sus_method == "ext":
        text_rank_summarize(upload_path=upload_folder, \
                            summary_path=summary_path, \
                            word_embeddings=word_emb) 
    else:
        assert False


# Define asyncronous error handling
@app.exception_handler(EmptyException)
async def empty_exception_handler(request: Request, e: EmptyException):
    return JSONResponse(
        status_code = 418,
        content = { "message": f"The sent request {e.query} can not be {e.name}" }
    )


async def QA_predict_to_json(question: str) -> json:
    """
    Returns the prediction and context to a question as json
    """
    if question == "":
        raise EmptyException(question)

    answer, context, = qa.predict(question)
    return { "answer": answer, "context": context }


@app.get("/")
async def lol():
    return {"msg": "Hello World!"}


@app.get("/token")
def get_token(request: Request):
    token = str(uuid4())
    # URL and Filename Safe Base64 Encoding
    urlSafeEncodedBytes = base64.urlsafe_b64encode(token.encode("utf-8"))
    safeToken = str(urlSafeEncodedBytes, "utf-8")
    
    return {"token": safeToken}


@app.post("/remove")
async def remove_dir(request:Request):
    query = await request.json()
    user = query["user"]

    try:
        shutil.rmtree(f'data/uploaded/{user}')
    except:
        pass
    return{"msg": "removed"}


@app.post("/question")
async def ask_question(request: Request):
    """
    Example:
    >>> curl -X POST http://localhost:5000/question -d '{"text": "Hello World"}' -H "Accept: application/json" -H "Content-type: application/json"
    """
    query = await request.json()
    question = query["text"]
    obj = await show_file(request)
    status_code = obj["status_code"]
    answer = await QA_predict_to_json(question=question)

    if (status_code == 200):
        return { "sum": obj["sum"], "answer": answer["answer"] }
    return answer


# TODO: Allow saving multiple files on storage, works sometimes, so probably wrong way right now
# TODO: Add examples of how to use this function
@app.post("/files")
async def upload_file(request: Request, file: List[UploadFile] = File(...)):
    """
    Uploads temporary file which is loadied in to the cdQA model as the data
    """
    query = await request.form()
    user = request.headers["authorization"]
    csv_folder      = f'data/uploaded/{user}/csv'
    upload_folder   = f'data/uploaded/{user}/text'
    summary_folder  = f'data/uploaded/{user}/summary'

    # Create folder to upload to
    if not os.path.exists(upload_folder) and user != 'null':
        os.makedirs(csv_folder)
        os.makedirs(upload_folder)
        os.makedirs(summary_folder)


    for f in file:
        file_object = f.file
        file_name = f.filename
        file_path = f"{upload_folder}/{file_name}"
        FOLDER_OBJ = open(os.path.join(upload_folder, file_name), 'wb+')
        shutil.copyfileobj(file_object, FOLDER_OBJ)
        FOLDER_OBJ.close()
        qa.convert_data(filepath=file_path)

    return { "msg": "file successfully read",
            "files": [f.filename for f in file]}


@app.post("/getfiles")
async def send_files(request:Request):
    query = await request.json()
    user = query['user']
    upload_folder = f'data/uploaded/{user}/text'
    summaries_folder = f"data/uploaded/{user}/summary"
    
    # TODO: Change to dynamic choise later
    sus_method = "ext"
    thread = threading.Thread(name="Summarizer Model", \
                    target=summarize, \
                    args=(upload_folder, summaries_folder, user, sus_method))
    thread.start()
    files = glob.glob(f'data/uploaded/{user}/text/*.txt')
    uploaded_files= []
    for f in files:
        uploaded_files.append(os.path.basename(f))
    return { "files": uploaded_files }


@app.post("/showfile")
async def show_file(request:Request):
    query = await request.json()
    user = query['user']    
    filename = query["file"]
    name, _ = os.path.splitext(str(filename))
    filepath_csv        = f"data/uploaded/{user}/csv/{name}.csv"
    filepath_summary    = f'data/uploaded/{user}/summary/{name}_summary.txt'
    qa.load_data(filepath=filepath_csv)
    
    try:
        f = open(filepath_summary, "r")
        content = f.read()
        status_code = 200
    except:
        content = ""
        status_code = 500
    return { "sum": content, "status_code": status_code }


@app.delete("/files")
async def remove_file(request:Request):
    query = await request.json()
    user = query['user']
    file_to_delete = query['file']
    csv_folder      = f'data/uploaded/{user}/csv' 
    upload_folder   = f'data/uploaded/{user}/text'
    summary_folder  = f'data/uploaded/{user}/summary'

    if query['all']:
        shutil.rmtree(csv_folder, ignore_errors=True)
        shutil.rmtree(upload_folder, ignore_errors=True)
        shutil.rmtree(summary_folder, ignore_errors=True)
        os.makedirs(csv_folder)
        os.makedirs(upload_folder)
        os.makedirs(summary_folder)
    else:
        os.remove(f'data/uploaded/{user}/text/{file_to_delete}')
        os.remove(f'data/uploaded/{user}/csv/{file_to_delete}')
        try:
            os.remove(f'data/uploaded/{user}/summary/{file_to_delete}')
        except:
            pass

    return {"msg": f"DELETED {file_to_delete}"}
