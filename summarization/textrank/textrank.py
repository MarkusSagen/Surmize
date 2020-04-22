# Credit for setup : https://www.analyticsvidhya.com/blog/2018/11/introduction-text-summarization-textrank-python/
import os
import numpy as np
import pandas as pd
import nltk
#nltk.download('punkt') # one time execution
import re
def get_data_text(path_r):
    summed_text = ""
    files = os.listdir(path_r)
    for file in files:
        with open(path_r + "/" + file,"r") as file:
            summed_text += "\n" + file.read()
    return summed_text


text = get_data_text("/home/alex/Desktop/Potential_sums/textrank/Stories")

#################################################################################
from nltk.tokenize import sent_tokenize
sentences = sent_tokenize(text)


# Extract word vectors
word_embeddings = {}
f = open('glove.6B.100d.txt', encoding='utf-8')
for line in f:
    values = line.split()
    word = values[0]
    coefs = np.asarray(values[1:], dtype='float32')
    word_embeddings[word] = coefs
f.close()

#################################################################################
# remove punctuations, numbers and special characters
clean_sentences = pd.Series(sentences).str.replace("[^a-zA-Z]", " ")

# make alphabets lowercase
clean_sentences = [s.lower() for s in clean_sentences]

#nltk.download('stopwords') Comment out after first time!

from nltk.corpus import stopwords
stop_words = stopwords.words('english')

# function to remove stopwords
def remove_stopwords(sen):
    sen_new = " ".join([i for i in sen if i not in stop_words])
    return sen_new

# remove stopwords from the sentences
clean_sentences = [remove_stopwords(r.split()) for r in clean_sentences]

#################################################################################


# Extract word vectors
word_embeddings = {}
f = open('glove.6B.100d.txt', encoding='utf-8')
for line in f:
    values = line.split()
    word = values[0]
    coefs = np.asarray(values[1:], dtype='float32')
    word_embeddings[word] = coefs
f.close()

sentence_vectors = []
for i in clean_sentences:
  if len(i) != 0:
    v = sum([word_embeddings.get(w, np.zeros((100,))) for w in i.split()])/(len(i.split())+0.001)
  else:
    v = np.zeros((100,))
  sentence_vectors.append(v)

#################################################################################

# similarity matrix
sim_mat = np.zeros([len(sentences), len(sentences)])

from sklearn.metrics.pairwise import cosine_similarity

for i in range(len(sentences)):
  for j in range(len(sentences)):
    if i != j:
      sim_mat[i][j] = cosine_similarity(sentence_vectors[i].reshape(1,100), sentence_vectors[j].reshape(1,100))[0,0]

#################################################################################

import networkx as nx

nx_graph = nx.from_numpy_array(sim_mat)
scores = nx.pagerank(nx_graph)

#################################################################################

ranked_sentences = sorted(((scores[i],s) for i,s in enumerate(sentences)), reverse=True)
summary = ""
# Extract top 10% of sentences as the summary
top_x_sentences = int(len(sentences)* 0.1)
for i in range(top_x_sentences):
  summary += ranked_sentences[i][1]

#Make it readable
from nltk.tokenize import word_tokenize
import math
words = summary.split(" ")

summary = ""
words_per_line = 15
lines = math.ceil(len(words) / words_per_line)
for i in range(lines):
    summary += " ".join(words[i*words_per_line : (i+1)*words_per_line])
    summary += "\n"


with open("Summaries/textrank" + str(top_x_sentences) + "sent.txt", "w") as file:
    file.write(summary)
