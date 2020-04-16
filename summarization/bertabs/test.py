import run_summarization


def test():
    run_summarization.main('Stories', "Summaries", 5, 0.95, 100, 200)


test()

""" app.post("/adadasd")
def sa:
    Spara filen i Stories
    kör summarization (spara i annan mapp)
    ta bort filen från Stories
    returnera summarize text """
