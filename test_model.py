
import os
import wget
import pandas as pd
from ast import literal_eval

from cdqa.utils.converters import pdf_converter
from cdqa.utils.filters import filter_paragraphs
from cdqa.pipeline import QAPipeline
from cdqa.utils.download import download_model


"""
Test if model can run on pdf files

"""

# Print the section: test on pdf files
print("\n\nTesting is model can predict on pdf-files")

# Load in PDF
df = pdf_converter(directory_path='./data/pdf/')
print("Read in DataFrame")
# print(df.head())
# print("hhh")


# Initialize pipeline
cdqa_pipeline = QAPipeline(reader='./models/bert_qa.joblib', max_df=1.0)
# Fit Retriever to documents
cdqa_pipeline.fit_retriever(df=df)
print("Fitted model to the data\n")


# Execute a Query
query = 'How many contracts did BNP Paribas Cardif sell in 2019?'
prediction = cdqa_pipeline.predict(query)


# Explore Predictions
print()
print('query: {}'.format(query))
print('answer: {}'.format(prediction[0]))
print('title: {}'.format(prediction[1]))
print('paragraph: {}'.format(prediction[2]))




# Execute a Query
query = 'How many contracts did BNP Paribas Cardif sell?'
prediction = cdqa_pipeline.predict(query)


# Explore Predictions
print()
print('query: {}'.format(query))
print('answer: {}'.format(prediction[0]))
print('title: {}'.format(prediction[1]))
print('paragraph: {}'.format(prediction[2]))



# Execute a Query
query = 'How many contracts did BNP sell?'
prediction = cdqa_pipeline.predict(query)


# Explore Predictions
print()
print('query: {}'.format(query))
print('answer: {}'.format(prediction[0]))
print('title: {}'.format(prediction[1]))
print('paragraph: {}'.format(prediction[2]))



# Execute a Query
query = 'How much did BNP Paribas Cardif sell?'
prediction = cdqa_pipeline.predict(query)


# Explore Predictions
print()
print('query: {}'.format(query))
print('answer: {}'.format(prediction[0]))
print('title: {}'.format(prediction[1]))
print('paragraph: {}'.format(prediction[2]))


# Execute a Query
query = 'How much did BNP sell?'
prediction = cdqa_pipeline.predict(query)


# Explore Predictions
print()
print('query: {}'.format(query))
print('answer: {}'.format(prediction[0]))
print('title: {}'.format(prediction[1]))
print('paragraph: {}'.format(prediction[2]))




"""
Test if the model can read CSV files

"""
# Print the section
print("\n\n\n\n")
print("================================")
print("\n\nTesting if model can predict on csv-files")

# print Content
df = pd.read_csv('./data/bnpp_newsroom_v1.1/bnpp_newsroom-v1.1.csv', converters={'paragraphs': literal_eval})
df = filter_paragraphs(df)
print("Read csv file")

# Make pipeline
cdqa_pipeline = QAPipeline(reader='./models/bert_qa.joblib')
cdqa_pipeline.fit_retriever(df=df)
print("Fitted model")

query = 'Since when does the Excellence Program of BNP Paribas exist?'
prediction = cdqa_pipeline.predict(query)


# Print Answer
print()
print('query: {}'.format(query))
print('answer: {}'.format(prediction[0]))
print('title: {}'.format(prediction[1]))
print('paragraph: {}'.format(prediction[2]))

