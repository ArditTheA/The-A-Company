from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.contrib.auth import get_user_model
from django.core.files import File
from urllib import request as urllib_request
from tempfile import NamedTemporaryFile
from django.core.mail import send_mail, BadHeaderError
from django.http import JsonResponse,HttpResponse
from django.template.loader import render_to_string

User = get_user_model()

class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    def pre_social_login(self, request, sociallogin):
        # Check if the email from the social account already exists
        email = sociallogin.account.extra_data['email']
        try:
            user = User.objects.get(email=email)
            # Check if the user is not already associated with a social account
            if not sociallogin.is_existing:
                # Connect the social account to the existing user account
                sociallogin.connect(request, user)
            if not user.username:
                user.username = email
                user.save()
        except User.DoesNotExist:
            # If user does not exist, create a new one
            user = User(email=email, username=email)  # You may adjust the fields as needed
            user.first_name = sociallogin.account.extra_data.get('given_name', '')
            user.last_name = sociallogin.account.extra_data.get('family_name', '')
            user.profile.save("profile.jpg", File(self.get_google_profile_picture(sociallogin.account.extra_data.get('picture'))))

            user.save()
            # Connect the social account to the newly created user account
            sociallogin.connect(request, user)
            subject = "Welcome to Worki"
            NewClinetemail = email
            email_template_applicant = "main/register/Welcome.txt"
            c = {
                "email": user.email,
                'domain': 'worki.global',
                'site_name': 'Worki',
                'user': request.user,
                'first_name': sociallogin.account.extra_data.get('given_name', ''),
            }
            email = render_to_string(email_template_applicant, c)
            try:
                send_mail(subject, email, 'Worki hello@worki.global',
                          [NewClinetemail], fail_silently=False)
            except BadHeaderError:
                return HttpResponse('Invalid header found.')
    def get_google_profile_picture(self, picture_url):
        # Download the image and save it as a Django File
        temp_file = NamedTemporaryFile(delete=True)
        temp_file.write(urllib_request.urlopen(picture_url).read())
        temp_file.flush()

        return temp_file