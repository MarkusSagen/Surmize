from nltk.tokenize import sent_tokenize
import os



def insert_newlines(PATH, USER):
    TEMPORARY_NEWLINE_PATH = "data/pending/" + str(USER) + "/newline_text/"
    os.makedirs("data/pending/" + str(USER) + "/newline_text/")
    files = os.listdir(PATH)
    for file in files:
        with open(PATH + "/" + file, "r") as f:
            text = f.read()
        sentences = sent_tokenize(text)
        text = ""
        for sentence in sentences:
            text += sentence + "\n\n"
        with open(TEMPORARY_NEWLINE_PATH + file, "w+") as f:
            f.write(text)
    return TEMPORARY_NEWLINE_PATH
