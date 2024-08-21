from accounts.views import *
import json
from django.core import serializers
def getDocumentForWorkPermitUser(request,pk):
    jpk=pk
    applications = Application.objects.filter(job_id=jpk).exclude(ApplicantStat="Not qualified")

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
            user_documents = documents_users.objects.filter(
                user_id=user_id,
            ).exclude(
                id_document__name__icontains="Job Offer"
            ).exclude(
                id_document__name__icontains="Work Permit"
            ).order_by('id_document_id')
            documents = serializers.serialize('json', user_documents)
            job_offer_count = documents_users.objects.filter(
                user_id=user_id,
                status="A",
                id_document__name__icontains="Job Offer"
            ).count()
            user_document = documents_users.objects.filter(
                user_id=user_id,
                status="A"
            ).exclude(
                id_document__name__icontains="Photo"
            ).exclude(
                id_document__name__icontains="Service contract"
            ).exclude(
                id_document__name__icontains="Resume"
            ).exclude(
                id_document__name__icontains="Job Offer"
            ).exclude(
                id_document__name__icontains="Work Permit"
            ).count()

            job_offer_count = documents_users.objects.filter(
                user_id=user_id,
                status="A",
                id_document__name__icontains="Job Offer"
            ).count()
            work_permit_count = documents_users.objects.filter(
                user_id=user_id,
                status="A",
                id_document__name__icontains="Work Permit"
            ).count()
            job_offer_and_work_permit_count = documents_users.objects.filter(
                user_id=user_id,
                status="A",
                id_document__name__icontains="Job Offer"
            ).filter(
                id_document__name__icontains="Work Permit"
            )

            two_last_documents = job_offer_count + work_permit_count
            second_documents = serializers.serialize('json', job_offer_and_work_permit_count)
            display_completed_phase = "none"
            display_completed_second_phase = "none"
            work_permit_is_here = "none"
            if user_document == 4:
                display_completed_phase = "block"
                userWorkPermit +=1
                work_permit_is_here = "auto"

            else:
                usersOnDocForWorkPermit +=1
                userList.append(user_id)
            if job_offer_count > 0 and work_permit_count > 0:
                if user_document == 4:
                    display_completed_second_phase = "block"
                         
                else:
                    display_completed_second_phase = "none"
                
            
        
    users = Application.objects.filter(user_id__in=userList,job_id=pk)
    uid =Application.objects.filter(job_id=jpk).values_list("user_id", flat=True).first()
    detailUser = CustomUser.objects.get(id=uid)
    ExpUser = UserExperiece.objects.filter(user_id=uid)
    EduUser = UserEducation.objects.filter(user_id=uid)
    LangUser = UserLanguages.objects.filter(user_id=uid)
    usLocation =""
        
    app=True
    q="DocForWorkPermit"
    return render(request, "Applicant-Doc/index.html", dict(users=users,q=q,app=app,us=detailUser,uExp=ExpUser,uEdu=EduUser,uLang = LangUser,jpk=jpk,uid=uid,ready_users_count=ready_users_count,userWorkPermit=userWorkPermit,second_documents=second_documents,usersOnDocForWorkPermit=usersOnDocForWorkPermit,display_completed_phase=display_completed_phase,display_completed_second_phase=display_completed_second_phase,documents=documents,work_permit_is_here=work_permit_is_here,two_last_documents=two_last_documents))





def getDocumentYourWorkPermitIsHere(request,pk):
    jpk=pk
    applications = Application.objects.filter(job_id=jpk).exclude(ApplicantStat="Not qualified")
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
            user_document = documents_users.objects.filter(
                user_id=user_id,
                status="A"
            ).exclude(
                id_document__name__icontains="Job Offer"
            ).exclude(
                id_document__name__icontains="Work Permit"
            ).count()
            user_documents = documents_users.objects.filter(
                user_id=user_id,
            ).exclude(
                id_document__name__icontains="Job Offer"
            ).exclude(
                id_document__name__icontains="Work Permit"
            ).order_by('id_document_id')
            documents = serializers.serialize('json', user_documents)
            job_offer_count = documents_users.objects.filter(
                user_id=user_id,
                status="A",
                id_document__name__icontains="Job Offer"
            ).count()
            work_permit_count = documents_users.objects.filter(
                user_id=user_id,
                status="A",
                id_document__name__icontains="Work Permit"
            ).count()
            job_offer_and_work_permit_count = documents_users.objects.filter(
                user_id=user_id,
                status="A",
                id_document__name__icontains="Job Offer"
            ).filter(
                id_document__name__icontains="Work Permit"
            )

            two_last_documents = job_offer_count + work_permit_count
            second_documents = serializers.serialize('json', job_offer_and_work_permit_count)
            display_completed_phase = "none"
            display_completed_second_phase = "none"
            work_permit_is_here = "none"
            if user_documents_count > 1 and user_documents_count <= 9:
                if user_document == 7:
                    userList.append(user_id)
                    userWorkPermit +=1
                    display_completed_phase = "block"
                    work_permit_is_here = "auto"

                else:
                    usersOnDocForWorkPermit +=1

                if job_offer_count > 0 and work_permit_count > 0:
                    if user_document == 7:
                         display_completed_second_phase = "block"
                    else:
                        display_completed_second_phase = "none"


       
    users = Application.objects.filter(user_id__in=userList,job_id=pk)
    uid =Application.objects.filter(job_id=jpk).values_list("user_id", flat=True).first()
    detailUser = CustomUser.objects.get(id=uid)
    ExpUser = UserExperiece.objects.filter(user_id=uid)
    EduUser = UserEducation.objects.filter(user_id=uid)
    LangUser = UserLanguages.objects.filter(user_id=uid)
        
    app=True
    q="YourWorkPermitIsHere"
    return render(request, "Applicant-Doc/index.html", dict(users=users,q=q,app=app,us=detailUser,uExp=ExpUser,uEdu=EduUser,uLang = LangUser,jpk=jpk,uid=uid,ready_users_count=ready_users_count,userWorkPermit=userWorkPermit,usersOnDocForWorkPermit=usersOnDocForWorkPermit,display_completed_phase=display_completed_phase,display_completed_second_phase=display_completed_second_phase,documents=documents,second_documents=second_documents,work_permit_is_here=work_permit_is_here,two_last_documents=two_last_documents))