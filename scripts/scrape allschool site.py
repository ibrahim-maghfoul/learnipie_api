import json
from urllib import response
import bson
import traceback
from bs4 import BeautifulSoup
import json
import urllib3
import arabic_reshaper
from bidi.algorithm import get_display
import os
from termcolor import colored


url = "https://www.alloschool.com/category/high-school"


Level = ''
Guidance = ''
ExamElements = []
Subject = ''
Course = ''
Links= []
Course_Video_Part_Title=''
Course_Exercice_Part_Title=''
Course_CourPdf_Part_Title=''
Course_Resourse_Part_Title=''

Courses = []
PDFExams = []
VideosExams = []
LinksExams = []
Exercice = ''
Exercices = []
Video = ''
Videos = []

Subject_with_all_course=[]
Subject_with_all_exams=[]


source_count=0



#Create a directory
directory = ""

 
def create_directory(level_dir_name, guidance_name):
  parent_dir = f"{directory}{level_dir_name}"
  path = os.path.join(parent_dir, guidance_name)
  os.makedirs(f"{path}", exist_ok=True)


def writeData(file_repo,items,guidance,level):
    try:
        courses_json = json.dumps(items, ensure_ascii=False)
        print(f"the title is : {guidance}the type of the variable is :{type(items)}")
        if file_repo == 0:
            create_directory(f"Courses/{level}",guidance)
            new_file = open(f'{directory}Courses/{level}/{guidance}/{guidance}.json' ,'w',encoding='utf-8')
        elif file_repo == 4:
            create_directory(f"Exams/{level}",guidance)
            new_file = open(f'{directory}Exams/{level}/{guidance}/{guidance}.json' ,'w',encoding='utf-8')
        elif file_repo == 1:
            create_directory(f"Subjects/{level}",guidance)
            new_file = open(f'{directory}Subjects/{level}/{guidance}/{guidance}.json' ,'w',encoding='utf-8')
        elif file_repo == 2:
            create_directory(f"Guidances",level)
            new_file = open(f'{directory}Guidances/{level}/{guidance}.json' ,'w',encoding='utf-8')
        elif file_repo == 3:
            create_directory(f"Levels",level)
            new_file = open(f'{directory}Levels/{level}/{guidance}.json' ,'w',encoding='utf-8')
        print(colored('\nSuccessfuly exported it as JSON\n', 'magenta'))
        new_file.write(f'{courses_json}')
        new_file.close()
    except Exception:
        new_file = open(f'{directory}issues/{guidance}.json' ,'w',encoding='utf-8')
        new_file.write(f'{items}')
        new_file.close()
        traceback.print_exc()




# list = [1]
Level_Obj=[]


# Function to generate random ID
def generate_random_ID():
    ran =  bson.ObjectId()
    return ran


# Log arabic to console
def convert(text):
    reshaped_text = arabic_reshaper.reshape(text)
    converted = get_display(reshaped_text)
    return converted



# return valid link
def valid_link(link):
    if link[0]=="$":
        return link[1:]
    else:
        return link



# response = requests.get(url,headers=headers,timeout=100)
http = urllib3.PoolManager()
response = http.request('get', url)
soup = BeautifulSoup(response.data, 'html.parser')
container = soup.find('ul', class_= "ul-timeline")
levels = container.find_all('li',class_='category-u',recursive=False)



for level in levels:
    # Genarate random id for every level
    level_id =generate_random_ID()
    # level title
    level_title = level.find('a').text
    Level = level_title.strip()
    print(colored(f"<############################################### {Level} ###############################################>",'green'))
    guidance_container = level.find("ul",'ul-timeline')
    guidances = guidance_container.find_all('li','category-u')
    Guidance_obj=[]
    for guidance in guidances:
        # Genarate random id for every guidance
        guidance_id = generate_random_ID()
        # Guidance title
        guidance_title = guidance.find('h3').text
        guidance_link =  guidance.find('a')['href']
        Guidance = guidance_title.strip()
        print(convert(f"<=========================== {Guidance} =============================>"))
        response = http.request('get', guidance_link)
        soup = BeautifulSoup(response.data, 'html.parser')
        subject_container = soup.find('ul',class_='ul-timeline')
        subjects = subject_container.find_all('li')
        Subject_Obj =[]
        for subject in subjects:
            # Genarate random id for every subject
            subject_id =generate_random_ID()
            # Subject title
            subject_title = subject.find('h2').text
            Subject=subject_title.strip()
            print(convert(f"<---------------- {Subject} ---------------->"))
            subject_link = subject.find('a')['href']
            response = http.request('get', subject_link)
            # response = http.request('get', "https://www.alloschool.com/course/allgha-alarbia-althania-bak-alom-riadhia-awa#!")
            soup = BeautifulSoup(response.data, 'html.parser')
            courses_container = soup.find('ul',class_='ul-timeline')
            courses = courses_container.find_all('li',class_='lesson')
            exams = courses_container.find_all('li',class_='exam')
            # courses.extend(exams)
            exams_fr = courses_container.find_all('li',class_='default')
            for exm in exams_fr:
                section_title = exm.find('h2').text
                if "جذاذات"  in section_title or "Révision" in section_title or "Fiches pédagogiques" in section_title or "Évaluations diagnostiques" in section_title:
                    continue
                else:
                    exams.append(exm)
            Course_Obj = []
            Exam_Obj = []
            for exam in exams:
                 # Genarate random id for every course
                exam_id =generate_random_ID()
                exam_title_container=exam.find('div',class_='t-h')
                exam_title = exam_title_container.find('h2').text
                Exam = exam_title.strip()
                print(colored(convert(f"<-----------{Exam}----------------->"),"yellow"))
                exam_subelements_container = exam.find('div',class_='t-b clearfix')
                exam_subelements_docs = exam_subelements_container.find_all('li', class_='element')
                exam_subelements_docs = [elem for elem in exam_subelements_docs if 'accordeon-head' not in elem.get('class', []) and len(elem.get('class', [])) == 1]
                if len(exam_subelements_docs)!=0:
                    for item in exam_subelements_docs:
                        source_count=source_count+1
                        is_video = item.find('span',class_='mdi mdi-youtube')
                        is_pdf = item.find('span',class_='mdi mdi-file-pdf-box')
                        exam_item_link_tag=item.find('a')
                        exam_Part_Title = exam_item_link_tag.text
                        exam_item_link = exam_item_link_tag['href']
                        doc_ele_title= exam_item_link_tag.get_text().strip()
                        response = http.request('get', exam_item_link)
                        soup = BeautifulSoup(response.data, 'html.parser')
                        doc_id = generate_random_ID()
                        exam_button_container = soup.find('a',class_='btn btn-lg btn-primary')
                        if exam_button_container is None:
                            item_link = valid_link(item.find('a')['href'])
                            Exam_Resourse_Part_Title = exam_Part_Title.strip()
                            item_link={"title": f"{doc_ele_title}","_id": f"{doc_id}","resourse": f"{item_link}"}
                            # print(f"{item_link}")
                            LinksExams.append(item_link)
                        else:
                            if is_pdf : 
                                exam = valid_link(exam_button_container['href'])
                                exam_CourPdf_Part_Title = exam_Part_Title.strip()
                                exam={"title": f"{doc_ele_title}","_id": f"{doc_id}","exam": f"{exam}"}
                                # print(f"{exam}")
                                PDFExams.append(exam)
                            elif is_video:
                                video_button_container = soup.find('div',class_='video-div')
                                video_button_ifram = soup.find('iframe')
                                video = valid_link(video_button_ifram['src'])
                                Exam_Video_Part_Title = exam_Part_Title.strip()
                                video={"title": f"{doc_ele_title}","_id": f"{doc_id}","video": f"{video}"}
                                print(colored(convert(f"<[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[ FOUND VIDEO ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]>"),"magenta"))
                                VideosExams.append(video)
                            else:
                                item_link = valid_link(item.find('a')['href'])
                                Exam_Resourse_Part_Title = exam_Part_Title.strip()
                                item_link={"title": f"{doc_ele_title}","_id": f"{doc_id}","resourse": f"{item_link}"}
                                # print(f"{item_link}")
                                LinksExams.append(item_link)
                    print(colored(convert(f'Links: {len(LinksExams)}:::::::::::Videos: {len(VideosExams)}::::::::::::::PDFs: {len(PDFExams)}:::::::::::::::::::::::::::::::: {source_count} Resources found! \n'),'cyan'))
                    Exam_Obj.append({"_id": f"{exam_id}","subject":f"{subject_id}","title": f"{Exam}","resourses": LinksExams,"examsPdf": PDFExams,"videos": VideosExams})
                    LinksExams = []
                    VideosExams = []
                    PDFExams = []
            for course in courses:
                 # Genarate random id for every course
                course_id =generate_random_ID()
                course_title_container=course.find('div',class_='t-h')
                course_title = course_title_container.find('h2').text
                Course = course_title.strip()
                print(colored(convert(f"\n<-----------{course_title.strip()}----------------->"),"yellow"))
                course_subelements_container = course.find('div',class_='t-b clearfix')
                course_subelements = course_subelements_container.find_all('li',class_='element accordeon-head')
                course_subelements_docs = course_subelements_container.find_all('li',class_='element')
                if len(course_subelements)==0 and len(course_subelements_docs)!=0:
                    for item in course_subelements_docs:
                        source_count=source_count+1
                        is_video = item.find('span',class_='mdi mdi-youtube')
                        is_pdf = item.find('span',class_='mdi mdi-file-pdf-box')
                        course_item_link_tag=item.find('a')
                        course_Part_Title = course_item_link_tag.text
                        course_item_link = course_item_link_tag['href']
                        doc_ele_title= course_item_link_tag.get_text().strip()
                        response = http.request('get', course_item_link)
                        soup = BeautifulSoup(response.data, 'html.parser')
                        doc_id = generate_random_ID()
                        if is_pdf :
                            course_button_container = soup.find('a',class_='btn btn-lg btn-primary')
                            course = valid_link(course_button_container['href'])
                            Course_CourPdf_Part_Title = course_Part_Title.strip()
                            course={"title": f"{doc_ele_title}","_id": f"{doc_id}","course": f"{course}"}
                            # print(f"{course}")
                            Courses.append(course)
                        elif is_video:
                            video_button_container = soup.find('div',class_='video-div')
                            video_button_ifram = soup.find('iframe')
                            video = valid_link(video_button_ifram['src'])
                            Course_Video_Part_Title = course_Part_Title.strip()
                            video={"title": f"{doc_ele_title}","_id": f"{doc_id}","video": f"{video}"}
                            # print(f"{video}")
                            Videos.append(video)
                        else:
                            item_link = valid_link(item.find('a')['href'])
                            Course_Resourse_Part_Title = course_Part_Title.strip()
                            item_link={"title": f"{doc_ele_title}","_id": f"{doc_id}","resourse": f"{item_link}"}
                            # print(f"{item_link}")
                            Links.append(item_link)
                    print(colored(convert(f'::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: {source_count} Resources found! \n'),'cyan'))
                    Course_Obj.append({"_id": f"{course_id}","subject":f"{subject_id}","title": f"{Course}","resourses": Links,"coursesPdf": Courses,"videos": Videos,"exercices": Exercices})
                else:
                    for item_count in range(len(course_subelements)):
                        course_subelement = course_subelements[item_count]
                        course_subelement_div_title = course_subelement.find('strong').get_text()
                        course_Part_Title=course_subelement_div_title.strip()
                        print(convert(f"<_______________________ {course_Part_Title} _______________________>"))
                        course_subelement_docs = course_subelement.find_next_siblings('li')
                        for doc in course_subelement_docs:
                            # Genarate random id for every doc
                            doc_id = generate_random_ID()
                            if len(doc.attrs['class'])==1:
                                source_count=source_count+1
                                video_class = doc.find('span',class_='mdi mdi-youtube')
                                if doc.find('span',class_='mdi mdi-file-pdf-box') is not None or video_class:
                                    course_item_link_tag=doc.find('a')
                                    course_item_link = course_item_link_tag['href']
                                    doc_ele_title= course_item_link_tag.get_text().strip()
                                    response = http.request('get', course_item_link)
                                    soup = BeautifulSoup(response.data, 'html.parser')
                                    Course_Exercice_Part_Title=''
                                    Course_CourPdf_Part_Title=''
                                    Course_Video_Part_Title=''
                                    Course_Resourse_Part_Title=''
                                    if ('Exercices' in course_subelement_div_title or "تمارين" in course_subelement_div_title) and not video_class:
                                        exercice_button_container = soup.find('a',class_='btn btn-lg btn-primary')
                                        exercice = valid_link(exercice_button_container['href'])
                                        Course_Exercice_Part_Title = course_Part_Title.strip()
                                        exercice={"title": f"{doc_ele_title}", "_id": f"{doc_id}","exercice": f"{exercice}"}
                                        #
                                        #  (f"{exercice}")
                                        Exercices.append(exercice)
                                    elif ("Cours"  in course_subelement_div_title or "دروس" in course_subelement_div_title) and not video_class :
                                        course_button_container = soup.find('a',class_='btn btn-lg btn-primary')
                                        course = valid_link(course_button_container['href'])
                                        Course_CourPdf_Part_Title = course_Part_Title.strip()
                                        course={"title": f"{doc_ele_title}","_id": f"{doc_id}","course": f"{course}"}
                                        #
                                        #  (f"{course}")
                                        Courses.append(course)
                                    elif "Vidéos"  in course_subelement_div_title or "فيديوهات" in course_subelement_div_title or doc.find('span',class_='mdi mdi-youtube'):
                                        if doc.find('span',class_='mdi mdi-youtube') is not None:
                                            video_button_container = soup.find('div',class_='video-div')
                                            video_button_ifram = soup.find('iframe')
                                            video = valid_link(video_button_ifram['src'])
                                            Course_Video_Part_Title = course_Part_Title.strip()
                                            video={"title": f"{doc_ele_title}","_id": f"{doc_id}","video": f"{video}"}
                                            Videos.append(video)
                                    else:
                                        course_button_container = soup.find('a',class_='btn btn-lg btn-primary')
                                        if course_button_container is not None:
                                            course = valid_link(course_button_container['href'])
                                            course={"title": f"{doc_ele_title}","_id": f"{doc_id}","course": f"${course}"}
                                            Courses.append(course)
                                        else:
                                            resource = {}
                                            Course_Resourse_Part_Title = valid_link(course_Part_Title.strip())
                                            resource={"title": f"{doc_ele_title}","_id": f"{doc_id}","resourse": f"{course_item_link}"}
                                            print("Appended to resourses")
                                            Links.append(resource)
                                else:
                                    item_link = doc.find('a')['href']
                                    Course_Resourse_Part_Title = valid_link(course_Part_Title.strip())
                                    item_link={"title": f"{doc_ele_title}","_id": f"{doc_id}","resourse": f"{item_link}"}
                                    Links.append(item_link)
                            else:
                                break
                    print(colored(convert(f'::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: {source_count} Resources found! \n'),'cyan'))

                    Course_Obj.append({"_id": f"{course_id}","subject":f"{subject_id}","title": f"{Course}","resourses": Links,"coursesPdf": Courses,"videos": Videos,"exercices": Exercices})
                    Exam = []
                    Exercices = []
                    Courses = []
                    Videos = []
                    Links = []
            full_course_id = generate_random_ID()
            Full_Course_Obj={"title":f"{Subject}","_id":f"{full_course_id}","guidance":f"{guidance_id}","courses":Course_Obj,"exams":Exam_Obj}
            Subject_with_all_course.extend(Course_Obj)
            Subject_with_all_exams.extend(Exam_Obj)
            print(f"(Subject : {Subject} ---> Courses count {len(Course_Obj)}, Exams count {len(Exam_Obj)})")
            Subject_Obj.append({"title": f"{Subject}","_id": f"{subject_id}","guidance":f"{guidance_id}"})
        writeData(0, Subject_with_all_course,Guidance,Level)
        writeData(4, Subject_with_all_exams,Guidance,Level)
        writeData(1, Subject_Obj,Guidance,Level)
        Exam_Obj=[]
        Course_Obj=[]
        Subject_Obj=[]
        Subject_with_all_course=[]
        Subject_with_all_exams=[]
        Guidance_obj.append({"title": f"{Guidance}","_id": f"{guidance_id}","level":f"{level_id}"})
    writeData(2,Guidance_obj,Level,Level )
    Guidance_obj=[]
    Level_Obj.append({"title": f"{Level}","_id": f"{level_id}"})
writeData(3 ,Level_Obj,"Levels","all levels")




