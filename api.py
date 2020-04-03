from flask import Flask, request, jsonify, redirect, flash
from flask_cors import CORS
from werkzeug.utils import secure_filename

import os
from ast import literal_eval
import pandas as pd

from cdqa.utils.filters import filter_paragraphs
from cdqa.pipeline import QAPipeline
from model import QA

app = Flask(__name__)
CORS(app)

# model = QA()

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'doc', 'docx', 'csv'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


dataset_path = os.environ["dataset_path"]
reader_path = os.environ["reader_path"]

df = pd.read_csv(dataset_path, converters={"paragraphs": literal_eval})
df = filter_paragraphs(df)

cdqa_pipeline = QAPipeline(reader=reader_path)
cdqa_pipeline.fit_retriever(df=df)

# What we send from the form
""" @app.route("/", methods=["POST"])
def test():
    question = request.json["text"]
 #   (answer, context) = model.question(question)
    return jsonify(
        answer=answer,
        context=context
    )
 """


@app.route("/files", methods=["POST"])
def file():

    # check if the post request has the file part
    if 'file' not in request.files:
        return jsonify(msg='No file part')

    file = request.files['file']
    # if user does not select file, browser also
    # submit an empty part without filename
    if file.filename == '':
        return jsonify(msg='No selected file')

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify(msg="File uploaded")
    return jsonify(msg="Something went wrong....")


@app.route("/", methods=["GET"])
def lol():
    return "HEJ"


@app.route("/api", methods=["GET", "POST"])
def api():

    query = request.json["text"]  # request.args.get("query")
    prediction = cdqa_pipeline.predict(query=query)

    return jsonify(
        query=query, answer=prediction[0], title=prediction[1], paragraph=prediction[2]
    )
