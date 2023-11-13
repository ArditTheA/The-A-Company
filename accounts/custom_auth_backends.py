# custom_auth_backends.py

from social_core.backends.google import GoogleOAuth2

class CustomGoogleOAuth2(GoogleOAuth2):
    def user_data(self, access_token, *args, **kwargs):
        user_data = super().user_data(access_token, *args, **kwargs)
        # Implement logic to link Google account with an existing email-based account here
        return user_data


# custom_auth_backends.py

from social_core.backends.google import GoogleOAuth2
from yourapp.models import UserProfile  # Import your user profile model

class CustomGoogleOAuth2(GoogleOAuth2):
    def user_data(self, access_token, *args, **kwargs):
        user_data = super().user_data(access_token, *args, **kwargs)
        # Check if a user with this email already exists
        existing_user = UserProfile.objects.filter(email=user_data.get('email')).first()
        if existing_user:
            # Link the Google account to the existing user
            self.strategy.storage.user.create_social_auth(existing_user, self, user_data)
        return user_data
