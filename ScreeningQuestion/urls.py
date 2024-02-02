
from .views import *
from django.urls import path,include

urlpatterns = [
    path("Close/all/unapproved/jobs/",CloseUnapprovedJobs),
    

    path("apply/Succesful", ApplySuc, name="appSuc"),
    path('make_application_ajax/', make_application_ajax, name='make_application_ajax'),

    path("SQ/add", AddQuestionnn, name="add-question"),
    path("SQ/edit/<int:pk>",editScreeningQuestion),
    # path("SQ/Add/push/<str:listPromp>/<str:listQuestionType>/<str:listIdealQuestion>/<str:listQualify>",addJobQuestion),

    path("SQ/<int:pk>/",getQuestion,name="applyQ"),
    path("SQ/test/<int:pk>",getUserAnswer,name="ttest"),
    # path("AddJob",add_JobScreeningQuestion,name="testSQ"),
]

