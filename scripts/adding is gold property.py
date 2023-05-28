import json
import traceback
import random


# dir = 'C:/Users/neulich/Desktop/college/learnipie'
# file_name = "all courses"
# file_path = f'{dir}/{file_name}'

# courses_list = []
# with open(f"{file_path}.json", 'r', encoding="utf8") as file:
#     data = json.load(file)
#     for element in data:
#         # COURSES
#         for course in element["coursesPdf"]:
#             if "وطن" in course["title"]:
#                 course["isGold"] = True
#             else:
#                 random_number = random.randint(0, 4)
#                 if (random_number == 0):
#                     course["isGold"] = True
#                 else:
#                     course["isGold"] = False
#         for course in element["videos"]:
#             if "وطن" in course["title"]:
#                 course["isGold"] = True
#             else:
#                 random_number = random.randint(0, 4)
#                 if (random_number == 0):
#                     course["isGold"] = True
#                 else:
#                     course["isGold"] = False
#         for course in element["exercices"]:
#             if "وطن" in course["title"]:
#                 course["isGold"] = True
#             else:
#                 random_number = random.randint(0, 4)
#                 if (random_number == 0):
#                     course["isGold"] = True
#                 else:
#                     course["isGold"] = False
#         for course in element["resourses"]:
#             if "وطن" in course["title"]:
#                 course["isGold"] = True
#             else:
#                 random_number = random.randint(0, 4)
#                 if (random_number == 0):
#                     course["isGold"] = True
#                 else:
#                     course["isGold"] = False
#         courses_list.append(element)
#     try:
#         courses_json = json.dumps(courses_list, ensure_ascii=False)
#         f = open(f"{dir}/gold_courses.json", "w", encoding='utf-8')
#         f.write(courses_json)
#         f.close()
#     except Exception:
#         traceback.print_exc()


trueItems = 0
lenItems = 0
 

dir = 'C:/Users/neulich/Desktop/college/learnipie'
file_name = "all exams"
file_path = f'{dir}/{file_name}'

exam_list = []
with open(f"{file_path}.json", 'r', encoding="utf8") as file:
    data = json.load(file)
    for element in data:
        # COURSES
        for exam in element["examsPdf"]:
            if "وطن" in exam["title"]:
                exam["isGold"] = True
                trueItems += 1
                lenItems += 1
            else:
                random_number = random.randint(0, 2)
                if (random_number == 0):
                    exam["isGold"] = True
                    trueItems += 1
                    lenItems += 1
                else:
                    exam["isGold"] = False
                    lenItems += 1
        for exam in element["resourses"]:
            if "وطن" in exam["title"]:
                exam["isGold"] = True
                trueItems += 1
                lenItems += 1
            else:
                random_number = random.randint(0, 2)
                if (random_number == 0):
                    exam["isGold"] = True
                    trueItems += 1
                    lenItems += 1
                else:
                    exam["isGold"] = False
                    lenItems += 1
        for exam in element["videos"]:
            if "وطن" in exam["title"]:
                exam["isGold"] = True
                trueItems += 1
                lenItems += 1
            else:
                random_number = random.randint(0, 2)
                if (random_number == 0):
                    exam["isGold"] = True
                    trueItems += 1
                    lenItems += 1
                else:
                    exam["isGold"] = False
                    lenItems += 1
        exam_list.append(element)
    print(lenItems)
    print(trueItems)
    try:
        courses_json = json.dumps(exam_list, ensure_ascii=False)
        f = open(f"{dir}/gold_exams.json", "w", encoding='utf-8')
        f.write(courses_json)
        f.close()
    except Exception:
        traceback.print_exc()


# dir = 'C:/Users/neulich/Desktop/kimiko_api/_data/old Data'

# ele_Count = 0
# with open(f"{dir}/gold_courses.json", 'r', encoding="utf8") as file:
#     data = json.load(file)
#     ele_Count = len(data)
# with open(f"{dir}/gold_exams.json", 'r', encoding="utf8") as file:
#     data = json.load(file)
#     ele_Count += len(data)


# dir = 'C:/Users/neulich/Desktop/learnipie'
# old_ele_Count = 0
# with open(f"{dir}/gold_exams.json", 'r', encoding="utf8") as file:
#     data = json.load(file)
#     old_ele_Count = len(data)
# with open(f"{dir}/gold_courses.json", 'r', encoding="utf8") as file:
#     data = json.load(file)
#     old_ele_Count += len(data)

# print(old_ele_Count - ele_Count)