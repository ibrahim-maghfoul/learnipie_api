import json
import traceback



dir = 'C:/Users/neulich/Desktop/college/learnipie'
file_name = "subjects_with_course_count"
file_path = f'{dir}/{file_name}'


courses_list = []
with open(f"{file_path}.json", 'r',encoding="utf8") as file:
    data = json.load(file)
    for subject in data:
        j = 0
        subject_title = subject["title"]
        if subject_title == "Physique et Chimie (BIOF)":
            subject["icon"] = "Physique et Chimie.png"
        elif subject_title == "Mathématiques (BIOF)":
            subject["icon"] = "Mathématiques.png"
        elif subject_title == "Sciences de la Vie et de la Terre (SVT BIOF)":
            subject["icon"] = "Sciences de la Vie et de la Terre (SVT).png"
        elif subject_title == "Sciences de la vie et de la Terre (SVT BIOF)":
            subject["icon"] = "Sciences de la Vie et de la Terre (SVT).png"
        else:
            subject["icon"] = f"{subject_title}.png"
        courses_list.append(subject)
    print(len(courses_list))
    try:
        courses_json = json.dumps(courses_list, ensure_ascii=False)
        new_dir = f"{dir}/gold_subjects.json"
        f = open(new_dir, "w",encoding='utf-8')
        f.write(courses_json)

        #Icons' title and count
        subjects_icons_list = []
        with open(new_dir, 'r',encoding="utf8") as file:
            data = json.load(file)
            for subject in data:
                subject_icon = subject["icon"]
                if not subject_icon in subjects_icons_list:
                    subjects_icons_list.append(subject_icon)
            print(len(subjects_icons_list))
            sorted_list = sorted(subjects_icons_list)
            for icon in sorted_list:
                print(icon)
        f.close()
    except Exception:
        traceback.print_exc()







