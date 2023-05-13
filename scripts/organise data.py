import os
import json
import glob


new_list = []
dir = 'C:/Users/neulich/Desktop'
folder_name = "levels"
rootdir = f'{dir}/{folder_name}/'

# Create directory if it doesn't exist
if not os.path.exists(f"{dir}/learnipie"):
    os.mkdir(f"{dir}/learnipie")

for filename in glob.iglob(f'{rootdir}**', recursive=True):
    if os.path.isfile(filename):
        filename = filename.replace('\\', '/')
        with open(filename, 'r', encoding="utf8") as fcc_file:
            fcc_data = json.load(fcc_file)
            new_list = [*new_list, *fcc_data]
            fcc_file.close()

with open(f"{dir}/learnipie/all {folder_name}.json", 'w', encoding="utf8") as file:
    data = json.dumps(new_list, ensure_ascii=False)
    file.write(f'{data}')
    file.close()