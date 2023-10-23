from allauth.socialaccount.adapter import DefaultSocialAccountAdapter

class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    def get_connect_redirect_url(self, request, socialaccount):
        if socialaccount.provider == 'google':
            return '/custom_google_connections_page/'
        else:
            return super().get_connect_redirect_url(request, socialaccount)