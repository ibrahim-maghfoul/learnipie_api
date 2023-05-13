import json
import traceback
import random

courses_dir = "_data/gold_courses.json"
exams_dir = "_data/gold_exams.json"
courses_list = []
exams_list = []
exam_strings = ["exam","exams","فروض","الأولمبياد","فرض","tests","test","devoir","devoirs"]
exams_list_in_courses = []
with open(f"{courses_dir}", 'r', encoding="utf8") as file:
    data = json.load(file)
    print(len(data))
    for element in data:
        for exam in exam_strings:
            if exam in element["title"]:
                exams_list.append(element)
                exams_list_in_courses.append(element)
                print(element)
                break
            else:
                courses_list.append(element)
                break

try:
    courses_json = json.dumps(exams_list_in_courses, ensure_ascii=False)
    f = open("_data/all_final_exams_in_courses.json", "w", encoding='utf-8')
    f.write(courses_json)
    f.close()
except Exception:
    traceback.print_exc()

# with open(f"{exams_dir}", 'r', encoding="utf8") as file:
#     exams_list.extend( json.load(file))

# print(len(exams_list))
# print(len(courses_list))
# try:
#     courses_json = json.dumps(courses_list, ensure_ascii=False)
#     f = open("_data/all_final_courses.json", "w", encoding='utf-8')
#     f.write(courses_json)
#     f.close()
# except Exception:
#     traceback.print_exc()
# try:
#     exams_json = json.dumps(exams_list, ensure_ascii=False)
#     f = open("_data/all_final_exams.json", "w", encoding='utf-8')
#     f.write(exams_json)
#     f.close()
# except Exception:
#     traceback.print_exc()

 