import glob
import os
def clean_directories(Directories):
    for dir in Directories:
        files = glob.glob(dir + "/*")
        for f in files:
            os.remove(f)
