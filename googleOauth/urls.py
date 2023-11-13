 path("accounts/login/",LoginView.as_view(template_name='registration/login.html'), name='custom_login'),
    path("accounts/social/signup/", SocialSignupView.as_view(), name='social_signup'),

    path('link-google-account/', link_google_account, name='link_google_account'),
    path('custom_google_connections_page/', custom_google_connections, name='custom_google_connections'),

    path('accounts/social/signup/google/', socialaccount_views.signup, name='socialaccount_signup_google'),
    path('google/sign-in/', GLoginView.as_view(), name='glogin'),
