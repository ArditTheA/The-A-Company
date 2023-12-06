from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.contrib.auth import get_user_model

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
            user.save()
            # Connect the social account to the newly created user account
            sociallogin.connect(request, user)