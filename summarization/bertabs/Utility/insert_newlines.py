from nltk.tokenize import sent_tokenize
import os


def insert_newlines(upload_path, user):
    """
    Inserts two newlines for each sentance. Needed for the abstractive BERT SUS
    """
    newline_upload_path = f"data/pending/{user}/newline_text"
    os.makedirs(newline_upload_path)

    for file in os.listdir(upload_path):
        lines = []
        with open(f"{upload_path}/{file}", "r") as f:
            for line in f:
                lines.append(bytes(line, "utf-8").decode("utf-8", "ignore"))            
            sentences = "".join(lines)
        sentences = sent_tokenize(sentences)
        text = "\n\n".join(sentences)

        with open(f"{newline_upload_path}/{file}", "w+") as f:
            f.write(text)

    return newline_upload_path

