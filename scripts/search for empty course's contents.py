import json
from tqdm.auto import tqdm
import arabic_reshaper
from bidi.algorithm import get_display
# Log arabic to console
def convert(text):
    reshaped_text = arabic_reshaper.reshape(text)
    converted = get_display(reshaped_text)
    return converted


dir ="C:/Users/ibrahim/Desktop/Scooly API/_data/courses.json"

def search_empth_data():
    with open(f"{dir}", 'r',encoding="utf8") as file:
        data = json.load(file)
        keys ={ "coursesPdf":"course","exercices":"exercice","exams":"exam","resources":"resource"}
        ele = 0
        emptyCou = 0
        for x in data:
            ele = ele +1
            chek = True
            for k in keys:
                if k in x:
                    if len(x[k]) != 0:
                        chek = False
            if  chek:
                emptyCou = emptyCou+1
                print(convert(f"{data[ele]['title']} "))
        print(emptyCou)




search_empth_data()
