from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from accounts.models import *
from datetime import datetime
from django.core.files.storage import default_storage


@csrf_exempt
@require_POST
def user_experience_ajax(request):
    user_id = request.user
    title = request.POST.get("id_title")
    company = request.POST.get("id_company")
    Country = request.POST.get("id_Country")
    city_usExp = request.POST.get("id_city_usExp")
    start_date = request.POST.get("id_start_date")
    end_date = request.POST.get("id_end_date")

    try:
        # Convert date strings to datetime objects in the expected format
        start_date = datetime.strptime(start_date, "%m/%d/%Y").strftime("%Y-%m-%d")
        
        if end_date:
            end_date = datetime.strptime(end_date, "%m/%d/%Y").strftime("%Y-%m-%d")
        else:
            end_date = None  # Set end_date to None if it is not provided
    except ValueError:
        return JsonResponse({'status': 'error', 'message': 'Invalid date format.'})
    
    try:
        userExp = UserExperiece()
        userExp.user_id = user_id
        userExp.title = title
        userExp.company = company
        userExp.Country = Country
        userExp.city_usExp = city_usExp
        userExp.start_date = start_date
        userExp.end_date = end_date

        userExp.save()
        return JsonResponse({'message': 'Application submitted successfully'})
    except ValueError:
        return JsonResponse({'status': 'error', 'message': 'Invalid date format.'})

    return JsonResponse({'message': 'Application submitted successfully'})


def user_education_ajax(request):
    user_id = request.user
    university = request.POST.get("id_university")
    degree = request.POST.get("id_degree")
    country_e = request.POST.get("id_country_e")
    city_e = request.POST.get("id_city_e")
    field_of_study = request.POST.get("id_field_of_study")
    start_year = request.POST.get("id_start_year")
    end_year = request.POST.get("id_end_year")
    total_examples_passed = request.POST.get("id_total_examples_passed")
    GPA = request.POST.get("id_GPA")
    try:
        # Convert date strings to datetime objects in the expected format
        start_year = datetime.strptime(start_year, "%m/%d/%Y").strftime("%Y-%m-%d")
        
        if end_year:
            end_year = datetime.strptime(end_year, "%m/%d/%Y").strftime("%Y-%m-%d")
        else:
            end_year = None  # Set end_date to None if it is not provided
        
    except ValueError:
        return JsonResponse({'status': 'error', 'message': 'Invalid date format.'})

    try:
        userEdu = UserEducation()
        userEdu.user_id = user_id
        userEdu.university = university
        userEdu.degree = degree
        userEdu.country_e = country_e
        userEdu.city_e = city_e
        userEdu.field_of_study = field_of_study
        userEdu.start_year = start_year
        userEdu.end_year=end_year
        userEdu.total_examples_passed = total_examples_passed
        userEdu.GPA = GPA
    
        userEdu.save()
        return JsonResponse({'message': 'Application submitted successfully'})
    except ValueError:
        return JsonResponse({'status': 'error', 'message': 'Invalid date format.'})
    return JsonResponse({'message': 'Application submitted successfully'})


def user_language_ajax(request):
    user_id = request.user
    language = request.POST.get("id_language").capitalize()
    level = request.POST.get("id_level")
    try:
    

        userLang = UserLanguages()
        userLang.user_id = user_id
        userLang.language = language
        userLang.level = level
        userLang.save()
   

        return JsonResponse({'message': 'Application submitted successfully'})

    except ValueError:
        return JsonResponse({'status': 'error', 'message': 'Invalid date format.'})
    return JsonResponse({'message': 'Application submitted successfully'})


def edit_user_cover_ajax(request):
    user_id = request.user.id
    cover = request.FILES.get("id_cover")
    print("--------")
    print("--------")
    print(cover.name)
    print("--------")
    print("--------")
    try:
        user = CustomUser.objects.get(id=user_id)
        user.cover = cover
        user.save()
        return JsonResponse({'message': 'Application submitted successfully'})
    except ValueError:
        return JsonResponse({'status': 'error', 'message': 'Invalid date format.'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

def edit_user_profile_ajax(request):
    user_id = request.user.id
    
    profile = request.FILES.get("id_profile")

    try:
        user = CustomUser.objects.get(id=user_id)
        user.profile = profile
        user.save()
        return JsonResponse({'message': 'Application submitted successfully'})
    except ValueError:
        return JsonResponse({'status': 'error', 'message': 'Invalid date format.'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

def edit_user_details_ajax(request):
    user_id = request.user.id
    first_name = request.POST.get("id_first_name")
    last_name = request.POST.get("id_last_name")
    Country = request.POST.get("id_country")
    City = request.POST.get("id_city")
    phone_number = request.POST.get("id_phone_number")
    try:
        user = CustomUser.objects.get(id=user_id)
        user.first_name = first_name
        user.last_name = last_name
        user.country = Country
        user.city = City
        user.phone_number = phone_number
        user.save()
        return JsonResponse({'message': 'Application submitted successfully'})
    except ValueError:
        return JsonResponse({'status': 'error', 'message': 'Invalid date format.'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})



def get_exp_details(request):
    experience_id = request.GET.get('experience_id')
    experience = UserExperiece.objects.get(pk=experience_id)
    experience_data = {
        'title': experience.title,
        'company': experience.company,
        'Country': experience.Country,
        'city_usExp': experience.city_usExp,
        'start_date': experience.start_date.strftime('%d/%m/%Y') if experience.start_date else None,
        'end_date': experience.end_date.strftime('%d/%m/%Y') if experience.end_date else None,
        # Add other fields as needed
    }

    return JsonResponse({'experience': experience_data})


def get_edu_details(request):
    education_id = request.GET.get("education_id")
    education = UserEducation.objects.get(pk = education_id)
    education_data = {
        "university": education.university,
        "degree": education.degree,
        "country_e": education.country_e,
        "city_e" : education.city_e,
        "field_of_study" : education.field_of_study,
        'start_year': education.start_year.strftime('%d/%m/%Y') if education.start_year else None,
        'end_year': education.end_year.strftime('%d/%m/%Y') if education.end_year else None,
        "total_examples_passed":education.total_examples_passed,
        "GPA":education.GPA,
    }
    return JsonResponse({"education":education_data})

def get_lang_details(request):
    language_id = request.GET.get("language_id")
    language = UserLanguages.objects.get(pk = language_id)
    language_data = {
        "language":str(language.language),
        "level": language.level,
    }
    return JsonResponse({"language":language_data})


from django.http import JsonResponse
from django.db import transaction

@transaction.atomic
def edit_user_experience(request):
    

    try:
        experience_id = request.POST.get("id_exp")
        experience_title = request.POST.get("id_title")
        experience_company = request.POST.get("id_company")
        experience_Country = request.POST.get("id_Country")
        experience_city = request.POST.get("id_city_usExp")
        experience_start_date = request.POST.get("id_start_date")
    

        experience = UserExperiece.objects.get(id=experience_id)
        experience.title = str(experience_title)
        print("Title:", experience.title)

        experience.company = str(experience_company)
        print("Company:", experience.company)

        experience.Country =str(experience_Country)
        print("Country:", experience.Country)

        experience.city_usExp = str(experience_city)
        print("City:", experience.city_usExp)

        start_date_str = request.POST.get("id_start_date")
        start_date = datetime.strptime(start_date_str, "%m/%d/%Y").strftime("%Y-%m-%d")
        experience.start_date = start_date
        print("Start Date:", experience.start_date)

        # Parse and format end_date if it exists
        end_date_str = request.POST.get("id_end_date")
        if end_date_str:
            end_date = datetime.strptime(end_date_str, "%m/%d/%Y").strftime("%Y-%m-%d")
            experience.end_date = end_date
            print("End Date:", experience.end_date)
        else:
            # Set end_date to None if not provided
            experience.end_date = None
            print("End Date: None")

        

        experience.save()
        print("--------------------")
        print("--------------------")
        print("--------------------")
        print("--------------------")
        print("--------------------")
        print(experience)

        print("--------------------")
        print("--------------------")
        print("--------------------")
        print("--------------------")
        print("--------------------")

        return JsonResponse({'message': 'Application submitted successfully'})
    except UserExperiece.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Experience not found.'})
    except ValueError:
        return JsonResponse({'status': 'error', 'message': 'Invalid date format.'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})


def edit_user_education(request):
    try:
        education_id = request.POST.get("id_edu")
        print("education_id:", education_id)

        education = UserEducation.objects.get(pk=education_id)
        
        education.university = request.POST.get("id_university")
        print("university:", education.university)

        education.degree = request.POST.get("id_degree")
        print("degree:", education.degree)

        education.country_e = request.POST.get("id_country_e")
        print("country_e:", education.country_e)

        education.city_e = request.POST.get("id_city_e")
        print("city_e:", education.city_e)

        education.field_of_study = request.POST.get("id_field_of_study")
        print("field_of_study:", education.field_of_study)

        # Parse and format start_year
        start_year_str = request.POST.get("id_start_year")
        start_year = datetime.strptime(start_year_str, "%m/%d/%Y").strftime("%Y-%m-%d")
        education.start_year = start_year
        print("Start Date:", education.start_year)

        # Parse and format end_date if it exists
        end_year_str = request.POST.get("id_end_year")
        if end_year_str:
            end_year = datetime.strptime(end_year_str, "%m/%d/%Y").strftime("%Y-%m-%d")
            education.end_year = end_year
            print("End Date:", education.end_year)
        else:
            # Set end_date to None if not provided
            education.end_year = None
            print("End Date: None")

        education.total_examples_passed = request.POST.get("id_total_examples_passed")
        print("total_examples_passed:", education.total_examples_passed)

        education.GPA = request.POST.get("id_GPA")
        print("GPA:", education.GPA)

        education.save()

        return JsonResponse({'message': 'Education information updated successfully'})
    except UserEducation.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Education not found.'})
    except ValueError:
        return JsonResponse({'status': 'error', 'message': 'Invalid year format.'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})
    
def edit_user_language(request):
    try:
        language_id = request.POST.get("id_lang")
        print("-------------------------")
        print("-------------------------")
        print("-------------------------")
        print(language_id)
        print(request.POST.get("id_language").capitalize())
        print(request.POST.get("id_level"))

        print("-------------------------")
        print("-------------------------")

        language = UserLanguages.objects.get(pk=language_id)
        language.language = request.POST.get("id_language").capitalize()
        language.level = request.POST.get("id_level")
        language.save()
        return JsonResponse({'message': 'Education information updated successfully'})
    except UserEducation.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Education not found.'})
    except ValueError:
        return JsonResponse({'status': 'error', 'message': 'Invalid year format.'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})






#Delete Lang / Edu / Exp

def deleteUserLang(request):
    try:
        language_id = request.POST.get("delete_id")
        print("---------------")
        print("---------------")
        print(language_id)
        print("---------------")
        print("---------------")

        language = UserLanguages.objects.get(id=language_id)
        print("---------------")
        print("---------------")
        print(language)
        print("---------------")
        print("---------------")
        language.delete()
        return JsonResponse({'message': 'Education information updated successfully'})
    except UserEducation.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Education not found.'})
    except ValueError:
        return JsonResponse({'status': 'error', 'message': 'Invalid year format.'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})
        


def deleteUserEdu(request):
    try:
        education_id = request.POST.get("delete_id")
        education = UserEducation.objects.get(id=education_id)
        education.delete()
        return JsonResponse({'message': 'Education information updated successfully'})
    except UserEducation.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Education not found.'})
    except ValueError:
        return JsonResponse({'status': 'error', 'message': 'Invalid year format.'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})
        

def deleteUserExp(request):
    try:
        experience_id = request.POST.get("delete_id")
        experience = UserExperiece.objects.get(id=experience_id)
        experience.delete()
        return HttpResponse("Experience deleted successfully")
    except UserLanguages.DoesNotExist:
        return HttpResponse("Experience not found")
    except Exception as e:
        return HttpResponse(f"An error occurred: {str(e)}")