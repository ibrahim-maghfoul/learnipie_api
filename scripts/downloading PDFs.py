import json
import requests
from pathlib import Path
from tqdm.auto import tqdm

dir = "C:/Users/ibrahim/Desktop/Scrape Allo school website/"


def download_file(range_len):
    download_dir = Path(f'{dir}download/pdf')
    download_dir.mkdir(parents=True,exist_ok=True)
    with open(f"{dir}all Courses.json", 'r',encoding="utf8") as file:
        data = json.load(file)
        print (len(data))
        keys ={ "coursesPdf":"course","exercices":"exercice","exams":"exam"}
        cour = 0
        j=0
        for x in range(range_len - 50,range_len):
            cour = cour +1
            i = data[x]
            for k in keys:
                if k in i:
                    # for h in i[k]:
                    for h in tqdm(i[k],colour="green"):
                        link = h[keys[k]]
                        file_name = Path(link).name.replace('-',' ')
                        response = requests.get(link)
                        download_dir.joinpath(file_name).write_bytes(response.content)
                        # global j
                        j= j+1
                    print(f"\nCourse: {cour}\nRange max value: {range_len}\nFile were downloaded: {j} \n")
                    # print(f"\nFile were downloaded: {j} \n")
        print(f"PDF count :{j}")

num1 = int(input())
download_file(num1)

