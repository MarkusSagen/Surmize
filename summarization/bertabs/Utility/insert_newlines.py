from nltk.tokenize import sent_tokenize
import os


def insert_newlines(upload_path, user):
    """
    Inserts two newlines for each sentance. Needed for the abstractive BERT SUS
    """
    newline_upload_path = f"data/pending/{user}/newline_text"
    os.makedirs(newline_upload_path)

    for file in os.listdir(upload_path):
        with open(f"{upload_path}/{file}", "r") as f:
            sentences = f.read()
        sentences = sent_tokenize(sentences)
        text = "\n\n".join(sentences)

        with open(f"{newline_upload_path}/{file}", "w+") as f:
            f.write(text)

    return newline_upload_path
