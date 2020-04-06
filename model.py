import os
import sys 
import wget
from cdqa.utils.download import download_squad, download_model, download_bnpp_data
from cdqa.utils.converters import pdf_converter
from cdqa.utils.filters import filter_paragraphs
import pandas as pd
from ast import literal_eval
from cdqa.pipeline import QAPipeline


trained_weights = './models/bert_qa.joblib'
pdf_directory = "./data/pdf"
csv_file = "./data/bnpp_newsroom_v1.1/bnpp_newsroom-v1.1.csv"


class QA:
    """
    Class for running Q&A on documents

    Example use:
    qa = QA()
    answerTuple = qa.question("?????")
    """
    def __init__(self, directory=csv_file):
        # Fix in order to convert only one file at a time
        # https://github.com/cdqa-suite/cdQA/issues/224
        self.cdqa_pipeline = QAPipeline(reader=trained_weights, max_df=1, min_df=1)
        self.directory = directory
        self.df = self.load_data(directory)
        


    def predict(self, question):
        """
        Question function

        Inparameter: A text string containing a question

        Returns:
        A tuple of two strings, first element is the direct answer to the question
        second element is the sentence/context where the answer was found
        """
        answer, title, context, score = self.cdqa_pipeline.predict(question)
        return answer, context
        

    # TODO: Read folder of txt files
    def load_data(self, directory=None, is_folder=False):
        """
        Read in date file/path and determines the tile type 
        If no file type, then assumes folder contatins pdfs 
        """
        if directory is None:
            return 
        
        self.file_path, self.file_extention = os.path.splitext(directory)

        # parse and encode csv
        if self.file_extention == ".csv":
            df = pd.read_csv(directory, converters={"paragraphs": literal_eval})
            df = filter_paragraphs(df)

        # TODO: Now only converst for one txt file
        # TODO: Add to allow convertion for more files
        # https://stackoverflow.com/questions/51491931/reading-text-files-from-subfolders-and-folders-and-creating-a-dataframe-in-panda
        if self.file_extention == ".txt":
            file_name = "temp_file"
            with open(directory) as f:
                paragraphs = [f.read()] # Needs to be in array for how cdqa reads csv
            df = pd.DataFrame({"title": file_name, "paragraphs": [paragraphs]})

            # Fix in order to convert only one file at a time
            # https://github.com/cdqa-suite/cdQA/issues/224
            
        # pares and encode pdf - TODO: Naive.. Assumes all directories have pdfs
        # parse and encode csv
        elif self.file_extention == "" or self.file_extention == ".pdf":
            df = pdf_converter(directory_path=directory)
        
        self.cdqa_pipeline.fit_retriever(df=df)
        return df


