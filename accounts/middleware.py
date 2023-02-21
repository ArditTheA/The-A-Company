from datetime import datetime, timedelta
from django.conf import settings
from django.utils import timezone

class SetCookieMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # Set a cookie with an expiration time of 24 hours
        expires = datetime.utcnow() + timedelta(hours=24)
        response.set_cookie('Worki_cookies', 'my_value', expires=expires)

        return response
