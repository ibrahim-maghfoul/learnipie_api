import json
import traceback
import os

# dir = 'C:/Users/neulich/Desktop/learnipie'
# file_name = "all Courses"
# file_path = f'{dir}/{file_name}'

# courses_list = []

# def add_res_count():
#     with open(f"{file_path}.json", 'r', encoding="utf8") as file:
#         data = json.load(file)
#         for item in data:
#             videos_count = len(item["videos"])
#             exercises_count = len(item["exercices"])
#             coursesPdf_count = len(item["coursesPdf"])
#             resources_count = len(item["resourses"])
#             count = videos_count + exercises_count + coursesPdf_count + resources_count
#             item["res_count"] = count
#             courses_list.append(item)
#         try:
#             if not os.path.exists(dir):
#                 os.makedirs(dir)

#             with open(f"{dir}/courses_with_count.json", "w", encoding='utf-8') as f:
#                 courses_json = json.dumps(courses_list, ensure_ascii=False)
#                 f.write(courses_json)
#         except Exception:
#             traceback.print_exc()




dir = 'C:/Users/neulich/Desktop/learnipie'
file_name = "all exams"
file_path = f'{dir}/{file_name}'

courses_list = []

def add_res_count():
    with open(f"{file_path}.json", 'r', encoding="utf8") as file:
        data = json.load(file)
        for item in data:
            videos_count = len(item["videos"])
            examsPdf_count = len(item["examsPdf"])
            resourses_count = len(item["resourses"])
            count = videos_count + examsPdf_count + resourses_count
            item["res_count"] = count
            courses_list.append(item)
        try:
            if not os.path.exists(dir):
                os.makedirs(dir)

            with open(f"{dir}/exams_with_count.json", "w", encoding='utf-8') as f:
                courses_json = json.dumps(courses_list, ensure_ascii=False)
                f.write(courses_json)
        except Exception:
            traceback.print_exc()

 
add_res_count()
