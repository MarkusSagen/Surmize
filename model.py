import os
import sys
import shutil 
import wget
from cdqa.utils.download import download_squad, download_model, download_bnpp_data
from cdqa.utils.converters import pdf_converter
from cdqa.utils.filters import filter_paragraphs
import pandas as pd
from ast import literal_eval
from cdqa.pipeline import QAPipeline


trained_weights = './models/bert_qa.joblib'
pdf_directory = "./data/examples/pdf"
csv_file = "./data/examples/bnpp_newsroom_v1.1/bnpp_newsroom-v1.1.csv"
csv_filename = "bnpp_newsroom-v1.1.csv"

class QA:
    def __init__(self, filepath=csv_file, filename=csv_filename, path=None):
        # Fix in order to convert only one file at a time
        # https://github.com/cdqa-suite/cdQA/issues/224
        self.cdqa_pipeline = QAPipeline(reader=trained_weights, max_df=1, min_df=1)
        self.filepath = filepath
        self.filename = filename
        self.path = path
        self.df = self.load_data(filepath=filepath, filename=csv_filename, path=None, is_folder=False)


    def predict(self, question):
        """
        Question function
        Inparameter: A text string containing a question

        Returns:
        A tuple of two strings, first element is the direct answer to the question
        second element is the sentence/context where the answer was found
        """
        answer, title, context, score = self.cdqa_pipeline.predict(question)
        return  answer, context
        

    # TODO: Read more files
    def load_data(self, filepath=None, filename=None, path=None, is_folder=False):
        """
        Read in date file/path and determines the tile type 
        If no file type, then assumes folder contatins pdfs 
        """
        if filepath is None:
            return 
        
        self.filepath = filepath
        self.name, self.extention = os.path.splitext(str(filename))
        self.filename = filename
        self.path = path


        if self.extention == ".csv":
            # csv needs to have "title" and "paragraphs" features
            df = pd.read_csv(filepath, converters={"paragraphs": literal_eval})
            df = filter_paragraphs(df)
            # https://stackoverflow.com/questions/51491931/reading-text-files-from-subfolders-and-folders-and-creating-a-dataframe-in-panda


        if self.extention == ".txt" or self.extention == ".story":
            with open(filepath) as f:
                paragraphs = [f.read()] # Needs to be in array for how cdqa reads csv
            df = pd.DataFrame({"title": self.filename, "paragraphs": [paragraphs]})
            self.convert_to_txt(self.extention)


        if self.extention == ".pdf":
            tmp_dir = f"{self.path}/tmp"
            tmp_filepath = f"{tmp_dir}/{self.filename}"

            if not os.path.exists(tmp_dir):
                os.makedirs(tmp_dir)
            shutil.copyfile(self.filepath, tmp_filepath)

            df = pdf_converter(directory_path=tmp_dir)
            shutil.rmtree(tmp_dir)      # Remove content in tmp dir
            os.remove(self.filepath)    # Remove original pdf file

            txt_file = f"{self.path}/{self.name}.txt"
            with open(txt_file, "w") as file:
                for line in df.loc[0]["paragraphs"]:
                    file.write("\n" + line)


        self.cdqa_pipeline.fit_retriever(df=df)
        return df
    

    def convert_to_txt(self, file_ext):
        """ 
        Convert from one file format to txt
        """
        if self.extention != ".txt":
            filepath_txt = f"{self.path}/{self.name}.txt"
            shutil.copyfile(self.filepath, filepath_txt)
            os.remove(self.filepath)
            self.filepath = filepath_txt
    
    