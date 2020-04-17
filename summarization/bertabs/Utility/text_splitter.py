from nltk.tokenize import sent_tokenize
import math
import os
import glob
def text_splitter(path_r,path_w, n_sentences):
    files_and_sizes = []
    files = glob.glob(path_r + "*")
    name_of_files = []
    for file_num, file_path in enumerate(files):
        with open(file_path,"r") as file:
            text = file.read()
            name_of_files.append(file_path.split("/")[-1])
        sentences = sent_tokenize(text)
        amount_of_files = math.ceil(len(sentences) / n_sentences)
        arr_split_texts = []
        for i in range(amount_of_files):
            arr_split_texts.append(" ".join(sentences[i*n_sentences:(i+1)*n_sentences]))

        for (i,text) in enumerate(arr_split_texts):
            with open(path_w + "part_" +str(file_num)+ "_" + str(i) + ".txt","w") as file:
                file.write(text)
        files_and_sizes.append((file_num, amount_of_files))
    return files_and_sizes, name_of_files
