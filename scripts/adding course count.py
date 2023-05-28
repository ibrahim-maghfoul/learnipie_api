import json
import traceback


dir = 'C:/Users/neulich/Desktop/college/learnipie'


# dir ="C:/Users/ibrahim/Desktop/KIMIKO API/Scooly API/_data/subjects.json"
courses_list = []
with open(f"{dir}/all subjects.json", 'r',encoding="utf8") as file:
    data = json.load(file)
    for subject in data:
        j = 0
        k=0
        subject_id = subject["_id"]
        with open(f"{dir}/gold_courses.json", 'r',encoding="utf8") as file:
            data = json.load(file)
            for course in data:
                course_subjectId = course["subject"]
                if(subject_id==course_subjectId):
                    j = j+1
        with open(f"{dir}/gold_exams.json", 'r',encoding="utf8") as file:
            data = json.load(file)
            for exam in data:
                exam_subjectId = exam["subject"]
                if(subject_id==exam_subjectId):
                    k = k+1
        
        subject["course_count"] = j + k
        print(subject["title"])
        print(j + k)
        courses_list.append(subject)
    print(len(courses_list))
    try:
        courses_json = json.dumps(courses_list, ensure_ascii=False)
        f = open(f"{dir}/subjects_with_course_count.json", "w",encoding='utf-8')
        f.write(courses_json)
        f.close()
    except Exception:
        traceback.print_exc()



