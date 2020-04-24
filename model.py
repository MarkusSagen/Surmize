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


#trained_weights = './models/bert_qa.joblib'
trained_weights = './models/distilbert_qa.joblib'
pdf_directory = "./data/examples/pdf"
csv_file = "./data/examples/bnpp_newsroom_v1.1/bnpp_newsroom-v1.1.csv"
csv_filename = "bnpp_newsroom-v1.1.csv"

class QA:
    def __init__(self):
        # Fix in order to convert only one file at a time
        # https://github.com/cdqa-suite/cdQA/issues/224
        self.cdqa_pipeline = QAPipeline(reader=trained_weights, max_df=1, min_df=1)


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
        

    def convert_data(self, filepath):
        """
        Convert data files 
        to txt
        """
        filename = os.path.basename(filepath)
        name, extension = os.path.splitext(str(filename)) 
        path, _ = filepath.split(f"/{filename}")
        filepath_txt = f"{path}/{name}.txt"

        if extension == ".csv":
            # csv needs to have "title" and "paragraphs" features
            df = pd.read_csv(filepath, converters={"paragraphs": literal_eval})
            df = filter_paragraphs(df)
            # https://stackoverflow.com/questions/51491931/reading-text-files-from-subfolders-and-folders-and-creating-a-dataframe-in-panda


        elif extension == ".txt" or extension == ".story":
            with open(filepath) as f:
                paragraphs = [f.read()] # Needs to be in array for how cdqa reads csv
            df = pd.DataFrame({"title": filename, "paragraphs": [paragraphs]})
            if extension != ".txt":
                shutil.copyfile(filepath, filepath_txt)
                os.remove(filepath)


        elif extension == ".pdf":
            tmp_dir = f"{path}/tmp"
            tmp_filepath = f"{tmp_dir}/{filename}"

            if not os.path.exists(tmp_dir):
                os.makedirs(tmp_dir)
            shutil.copyfile(filepath, tmp_filepath)

            df = pdf_converter(directory_path=tmp_dir)
            shutil.rmtree(tmp_dir, ignore_errors=True)
            os.remove(filepath)    # Remove original pdf file

            with open(filepath_txt, "w") as file:
                for line in df.loc[0]["paragraphs"]:
                    file.write("\n" + line)

        
        root, _ = filepath.split(f"/text") 
        filepath_csv = f"{root}/csv/{name}.csv"
        print(filepath)
        print(filename)
        print(name)

        self.name = name
        self.root = root
        df.to_csv(f"{filepath_csv}", index=False)
        


    def convert_and_load(self, filepath=None, filename=None):
        self.convert_data(filepath)
        self.load_data(filepath)
        

    # TODO: Read more files
    def load_data(self, filepath=None):
        """
        Read in date file/path and determines the tile type 
        If no file type, then assumes folder contatins pdfs 
        """ 
        
        df = pd.read_csv(filepath, converters={"paragraphs": literal_eval})
        df = filter_paragraphs(df)
        self.cdqa_pipeline.fit_retriever(df=df)
        
    
