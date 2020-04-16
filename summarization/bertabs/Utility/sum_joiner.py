import os
def sum_joiner(path_r,path_w,files_and_sizes,name_of_files):
    assert len(files_and_sizes) == len(name_of_files)
    for (file_no, files_size) in files_and_sizes:
        summed_text = ""
        files = len(os.listdir(path_r))
        for i in range(files_size):
            with open(path_r + "/part_"+ str(file_no)+ "_" +str(i)+"_summary.txt","r") as file:
                summed_text += "\n" + file.read()



        with open(path_w + name_of_files[file_no].split(".")[0] +"_summary.txt","w") as file:
                file.write(summed_text)
