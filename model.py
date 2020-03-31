import os 
import wget
from cdqa.utils.download import download_squad, download_model, download_bnpp_data
from cdqa.utils.converters import pdf_converter
import pandas as pd
from ast import literal_eval
from cdqa.pipeline import QAPipeline

directory = os.getcwd() + "/data/pdf"

"""
Class for running Q&A on documents

Example use:
qa = QA()
answerTuple = qa.question("[-The question-]")
"""
class QA:
    def __init__(self):
        # Initialize the pool of articles
        self.df = pdf_converter(directory_path=directory)

        self.cdqa_pipeline = QAPipeline(reader='models/bert_qa.joblib')
        self.cdqa_pipeline.fit_retriever(df=self.df)

    """
    Question function

    Inparameter: A text string containing a question

    Returns:
    A tuple of two strings, first element is the direct answer to the question
    second element is the sentence/context where the answer was found
    """
    def question(self, query):
        prediction = self.cdqa_pipeline.predict(query)

        answer = prediction[0]
        context = prediction[2]

        return (answer, context)
