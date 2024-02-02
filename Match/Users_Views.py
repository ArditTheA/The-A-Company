from accounts.views import *
import json
def getDocumentForWorkPermitUser(request,pk):
    jpk=pk
    applications = Application.objects.filter(job_id=jpk)

            # Step 2: Extract unique user_ids from the applications
    user_ids = applications.values_list('user_id', flat=True).distinct()
        
    userWorkPermit = 0
    ready_users_count = 0
    usersOnDocForWorkPermit = 0
    userList = []
    for user_id in user_ids:
        user_documents_count = documents_users.objects.filter(
                id_document__in=documents_list.objects.all(),
                user_id=user_id
            ).count()

        all_documents_count = documents_list.objects.count()
        user_document = documents_users.objects.filter(
                    id_document__in=documents_list.objects.all(),
                    user_id=user_id,status = "A"
                ).count()
        if user_documents_count > 1 and user_documents_count <= 9:
            if user_document >= 7 and user_document <= 9:
                userWorkPermit +=1
            else:
                usersOnDocForWorkPermit +=1
                userList.append(user_id)
                
            
        
    users = Application.objects.filter(user_id__in=userList,job_id=pk)
    uid =Application.objects.filter(job_id=jpk).values_list("user_id", flat=True).first()
    detailUser = CustomUser.objects.get(id=uid)
    ExpUser = UserExperiece.objects.filter(user_id=uid)
    EduUser = UserEducation.objects.filter(user_id=uid)
    LangUser = UserLanguages.objects.filter(user_id=uid)
    usLocation =""
        
    app=True
    q="DocForWorkPermit"
    return render(request, "Applicant-Doc/index.html", dict(users=users,q=q,app=app,us=detailUser,uExp=ExpUser,uEdu=EduUser,uLang = LangUser,jpk=jpk,uid=uid,ready_users_count=ready_users_count,userWorkPermit=userWorkPermit,usersOnDocForWorkPermit=usersOnDocForWorkPermit))
    




def getDocumentYourWorkPermitIsHere(request,pk):
    jpk=pk
    applications = Application.objects.filter(job_id=jpk)
    user_ids = applications.values_list('user_id', flat=True).distinct()
    userWorkPermit = 0
    ready_users_count = 0
    usersOnDocForWorkPermit = 0
    userList = []
    for user_id in user_ids:
        user_documents_count = documents_users.objects.filter(
                id_document__in=documents_list.objects.all(),
                user_id=user_id,status="A"
            ).count()
            
        all_documents_count = documents_list.objects.count()
        if user_documents_count >= 7:
            userWorkPermit +=1
            userList.append(user_id)
       
    users = Application.objects.filter(user_id__in=userList,job_id=pk)
    uid =Application.objects.filter(job_id=jpk).values_list("user_id", flat=True).first()
    detailUser = CustomUser.objects.get(id=uid)
    ExpUser = UserExperiece.objects.filter(user_id=uid)
    EduUser = UserEducation.objects.filter(user_id=uid)
    LangUser = UserLanguages.objects.filter(user_id=uid)
        
    app=True
    q="YourWorkPermitIsHere"
    return render(request, "Applicant-Doc/index.html", dict(users=users,q=q,app=app,us=detailUser,uExp=ExpUser,uEdu=EduUser,uLang = LangUser,jpk=jpk,uid=uid,ready_users_count=ready_users_count,userWorkPermit=userWorkPermit,usersOnDocForWorkPermit=usersOnDocForWorkPermit)) 