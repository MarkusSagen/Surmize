
# for cdQA
import os
import wget
import pandas as pd
from ast import literal_eval
from cdqa.utils.converters import pdf_converter
from cdqa.utils.filters import filter_paragraphs
from cdqa.pipeline import QAPipeline
from cdqa.utils.download import download_model, download_bnpp_data

# for summarizer
import nltk
nltk.download('punkt')
nltk.download('stopwords')

# Download the BNP dataset
download_bnpp_data(dir='./data/examples/bnpp_newsroom_v1.1/')

# Download the model weights
#download_model(model='bert-squad_1.1', dir='./models')
download_model(model='distilbert-squad_1.1', dir='./models')

def download_pdf():
    """
    Download pdf files from BNP Paribas public news
    """
    directory = './data/examples/pdf/'
    models_url = [
        'https://invest.bnpparibas.com/documents/1q19-pr-12648',
        'https://invest.bnpparibas.com/documents/4q18-pr-18000',
        'https://invest.bnpparibas.com/documents/4q17-pr'
    ]

    print('\nDownloading PDF files...')
    if not os.path.exists(directory):
        os.makedirs(directory)
        print("Makeing dir: {}".format(directory))
    for url in models_url:
        wget.download(url=url, out=directory)
        print("downloading: {}".format(url))

    print("Finished downloading")


# Download pdf files
download_pdf()
