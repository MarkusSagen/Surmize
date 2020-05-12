__authors__ = "Markus Sagen, Sebastian Rollino, Nils Hedberg, Alexander Bergkvist"
import os, sys
import shutil
import pandas as pd
from pathlib import Path
import glob
import threading
import timeit
from codetiming import Timer

sys.path.append(os.path.join(sys.path[0],'summarization', 'bertabs'))
sys.path.append(os.path.join(sys.path[0],'summarization', 'bertabs', 'Utility'))

import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi import FastAPI, File, Query, Form, UploadFile, Request, HTTPException,WebSocket
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
from summarization.bertabs.Utility.insert_newlines import insert_newlines
from summarization.textrank.text_rank_summarize import text_rank_summarize,word_embeddings


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



# Empty request exception
class EmptyException(Exception):
    def __init__(self, query: str):
        self.name = "'Emtpy'"
        self.query = f"'{query}'"


# Return QA prediction from model

def summarize(upload_folder, summary_path, user, sus_method,isnew):
    """
    Summarize TXT file and store summary in new summaries path
    """
    if sus_method == "abs":
        with Timer(name="Abs. SUS", text="Abs Sus. took: {:0.2f} seconds"):
            temp_new_line_folder = insert_newlines(upload_folder, user)
            summarizer.main(rDir=temp_new_line_folder, sDir=summary_path, \
                        beam=8, alpha=0.75, minl=150, maxl=200)
            shutil.rmtree(f"data/pending/{user}") 
    elif sus_method == "ext":
        with Timer(name="Abs. SUS", text="Ext Sus. took: {:0.2f} seconds"):
            text_rank_summarize(upload_path=upload_folder, \
                            summary_path=summary_path, \
                            word_embeddings=word_emb)
    else:
        assert False
    if (isnew):
        shutil.rmtree(f"data/uploaded/{user}/tmp")
   
       


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
    
    with Timer(name="QA", text="QA took: {:0.2f} seconds"):
        answer, context, score = qa.predict(question)
    return { "answer": answer, "context": context, "score": score}


@app.get("/api/api/")
async def home():
    return {"msg": "Hello World!"}


@app.get("/api/token")
def get_token(request: Request):
    """
    Get temporary Session ID token to use the application

    >>> curl -X GET "http://localhost:5000/token" -H  "accept: application/json"
    """
    token = str(uuid4())
    # URL and Filename Safe Base64 Encoding
    urlSafeEncodedBytes = base64.urlsafe_b64encode(token.encode("utf-8"))
    safeToken = str(urlSafeEncodedBytes, "utf-8")

    return {"token": safeToken}


@app.post("/api/remove")
async def remove_dir(request:Request):
    query = await request.json()
    user = query["user"]

    try:
        shutil.rmtree(f'data/uploaded/{user}')
        shutil.rmtree(f'data/pending/{user}')
    except:
        pass
    return{"msg": "removed"}


@app.post("/api/question")
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
        return { "sum": obj["sum"], "answer": answer }
    return answer


# TODO: Allow saving multiple files on storage, works sometimes, so probably wrong way right now
# TODO: Add examples of how to use this function
@app.post("/api/files")
async def upload_file(request: Request, file: List[UploadFile] = File(...)):
    """
    Uploads temporary file which is loadied in to the cdQA model as the data
    """
    query = await request.form()
    user = request.headers["authorization"]
    #csv_folder      = f'data/uploaded/{user}/csv'
    upload_folder   = f'data/uploaded/{user}/text'
    summary_folder  = f'data/uploaded/{user}/summary'
    new_tmp_folder= f'data/uploaded/{user}/tmp'
    new = query["new"]
    
    # Create folder to upload to
    if not os.path.exists(upload_folder) and user != 'null':
        #os.makedirs(csv_folder)
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
    
    
    if new=="true":
        os.makedirs(new_tmp_folder)
        for f in file:
            file_object = f.file
            file_name = f.filename
            # Get only TXT version of file uploaded for summary
            name, _ = os.path.splitext(str(file_name)) 
            file_path_src=f"{upload_folder}/{name}.txt"
            file_path_dst = f"{new_tmp_folder}/{name}.txt"
            shutil.copy(file_path_src,file_path_dst)
    
        isabstractive= query["mode"]
        sus_method = "" 
        if isabstractive=="true":
           sus_method = "abs"
        else:
           sus_method = "ext"
        thread = threading.Thread(name="Summarizer Model", \
                    target=summarize, \
                    args=(new_tmp_folder, summary_folder, user, sus_method,True))
        thread.start()

    return { "msg": "file successfully read",
            "files": [f.filename for f in file]}


@app.post("/api/getfiles")
async def send_files(request:Request):
    query = await request.json()
    user = query['user']
    if(user):
        isabstractive = query["mode"]
        upload_folder = f'data/uploaded/{user}/text'
        summaries_folder = f"data/uploaded/{user}/summary"
    
        sus_method = ""
        if isabstractive:
            sus_method = "abs"
        else:
            sus_method = "ext"

        thread = threading.Thread(name="Summarizer Model", \
                    target=summarize, \
                    args=(upload_folder, summaries_folder, user, sus_method,False))
        thread.start()

        files = glob.glob(f'data/uploaded/{user}/text/*.txt')
        uploaded_files = []
        for f in files:
            uploaded_files.append(os.path.basename(f))
        return { "files": uploaded_files }
    return


@app.post("/api/showfile")
async def show_file(request:Request):
    query = await request.json()
    user = query['user']
    filename = query["file"]
    content = ""
    
    if filename == "":
        return {"sum": content, "status_code": 418} # Empty filename error
    
    name, _ = os.path.splitext(str(filename))
    #filepath_csv        = f"data/uploaded/{user}/csv/{name}.csv"
    filepath_summary    = f'data/uploaded/{user}/summary/{name}_summary.txt'
    
    """ if os.path.exists(filepath_csv):
        qa.load_data(filepath=filepath_csv)
    else: """
    filepath_txt    = f"data/uploaded/{user}/text/{name}.txt" 
    qa.convert_and_load(filepath=filepath_txt)

    try:
        f = open(filepath_summary, "r")
        content = f.read()
        status_code = 200
    except IOError:
        status_code = 500

    return { "sum": content, "status_code": status_code }

@app.post("/api/textUpload")
async def handle_text(request: Request):
    query = await request.json()
    user = query['user']
    text= query["text"]
    new= query["new"]
    upload_folder   = f'data/uploaded/{user}/text'
    summary_folder  = f'data/uploaded/{user}/summary'
    new_tmp_folder= f'data/uploaded/{user}/tmp'
    if not(new):
        if not os.path.exists(upload_folder) and user != 'null':
            #os.makedirs(csv_folder)
            os.makedirs(upload_folder)
            os.makedirs(summary_folder)
            
    r=str(uuid4()).split("-")
    f= open(f"{upload_folder}/text_{r[0]}.txt", "w+")
    f.write(text)
    f.close()
    if new:
        os.makedirs(new_tmp_folder)
        fi=open(f'data/uploaded/{user}/tmp/text_{r[0]}.txt', "w+")
        fi.write(text)
        fi.close()
        thread = threading.Thread(name="Summarizer Model", \
                    target=summarize, \
                    args=(new_tmp_folder, summary_folder, user, "ext",True))
        thread.start()
        return {"file":f"text_{r[0]}.txt"}

    return{"msg": "UPLOADED"}


@app.delete("/api/files")
async def remove_file(request:Request):
    query = await request.json()
    user = query['user']
    file_to_delete = query['file']
    #csv_folder      = f'data/uploaded/{user}/csv'
    upload_folder   = f'data/uploaded/{user}/text'
    summary_folder  = f'data/uploaded/{user}/summary'
    name, _ = os.path.splitext(str(file_to_delete))
    if query['all']:
        #shutil.rmtree(csv_folder, ignore_errors=True)
        shutil.rmtree(upload_folder, ignore_errors=True)
        shutil.rmtree(summary_folder, ignore_errors=True)
        #os.makedirs(csv_folder)
        os.makedirs(upload_folder)
        os.makedirs(summary_folder)
    else:
        os.remove(f'data/uploaded/{user}/text/{file_to_delete}')
        os.remove(f'data/uploaded/{user}/summary/{name}_summary.txt')
        #os.remove(f'data/uploaded/{user}/csv/{file_to_delete}')
        try:
            os.remove(f'data/uploaded/{user}/summary/{file_to_delete}')
        except:
            pass

    return {"msg": f"DELETED {file_to_delete}"}

@app.websocket("/api/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            data= json.loads(data)
            user = data['user']
            filename = data["file"]
            content = ""
            name, _ = os.path.splitext(str(filename))
    
            filepath_summary    = f'data/uploaded/{user}/summary/{name}_summary.txt'
    
            """ if os.path.exists(filepath_csv):
            qa.load_data(filepath=filepath_csv)
            else: """
            filepath_txt    = f"data/uploaded/{user}/text/{name}.txt" 
            qa.convert_and_load(filepath=filepath_txt)

            try:
                f = open(filepath_summary, "r")
                content = f.read()
                status_code = 200
            except IOError:
                status_code = 500

            data = { "file":filename, "sum": content, "status_code": status_code }


            await websocket.send_text(json.dumps(data))
    finally:
        await websocket.close()
