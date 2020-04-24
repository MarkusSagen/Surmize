# Credit for setup : https://www.analyticsvidhya.com/blog/2018/11/introduction-text-summarization-textrank-python/
import math
import os

import nltk
from nltk.tokenize import sent_tokenize
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
       
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import networkx as nx
from tqdm.auto import tqdm
import timeit
#nltk.download('punkt') # one time execution
#nltk.download('stopwords') Comment out after first time!


def text_rank_summarize(upload_path, summary_path, word_embeddings, fraction_of_words=0.2):
    """
    Return TextRank summary 
    param: fraction_of_words 

    >>> text_rank_summarize(upload_folder, summary_folder, 0.2)
    >>> Returns top 10 sentances of each file in "upload_folder"
    """
    start = timeit.default_timer()
    files = os.listdir(upload_path)
    stop_words = stopwords.words('english')
    

    for file in tqdm(files):
        with open(f'{upload_path}/{file}') as f:
            text = f.read()

        sentences = sent_tokenize(text)
        len_sentence = len(sentences)

        # remove stopwords from the sentences
        def remove_stopwords(sen):
            return " ".join([i for i in sen if i not in stop_words])
        
        # Clean and remove stop words
        clean_sentences = [remove_stopwords(s.lower().split()) for s in pd.Series(sentences).str.replace("[^a-zA-Z]", " ")]

        sentence_vectors = []
        for i in clean_sentences:
            if len(i) != 0:
                v = sum([word_embeddings.get(w, np.zeros((100,))) for w in i.split()])/(len(i.split())+0.001)
            else:
                v = np.zeros((100,))
            sentence_vectors.append(v)

        # similarity matrix
        sim_mat = np.zeros([len_sentence, len_sentence])
        for i in range(len_sentence):
            for j in range(len_sentence):
                if i != j:
                    sim_mat[i][j] = cosine_similarity(sentence_vectors[i].reshape(1,100), sentence_vectors[j].reshape(1,100))[0,0]

        # Calculate PageRank scores from matrix        
        scores = nx.pagerank(nx.from_numpy_array(sim_mat))
        ranked_sentences = sorted(((scores[i],s) for i,s in enumerate(sentences)), reverse=True)

        # Extract top 10 sentences as the summary
        top_x_sentences = int(len_sentence * fraction_of_words)
        summary = " ".join([ranked_sentences[i][1] for i in range(top_x_sentences)])
        
        filename, _ = os.path.splitext(str(file)) 
        with open(f'{summary_path}/{filename}_summary.txt', "w") as f:
            f.write(summary)

    end = timeit.default_timer()
    print("Extensive summarization Took: {} seconds".format(end-start))


def word_embeddings(embedding_path='summarization/textrank/glove.6B.100d.txt'):
    # Extract word vectors
    word_embeddings = {}
    with open(embedding_path, encoding='utf-8') as f:
        for line in f:
            values = line.split()
            word = values[0]
            coefs = np.asarray(values[1:], dtype='float32')
            word_embeddings[word] = coefs

    return word_embeddings
