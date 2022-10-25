

import os
from pickle import TRUE

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '0x-zrhf@)(t)%-630q&s&9g_c^lvh_9cehy@7vx==@bxgn_s_='

# SECURITY WARNING: don't run with debug turned on in production!

DEBUG = False    
DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'
SILENCED_SYSTEM_CHECKS = ["auth.W004"]
ALLOWED_HOSTS = ["*"]
CSRF_TRUSTED_ORIGINS = ['https://worki.global']

DEBUG = False
DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'
SILENCED_SYSTEM_CHECKS = ["auth.W004"]
ALLOWED_HOSTS = ['*']

SOCIALACCOUNT_LOGIN_ON_GET=True
SOCIALACCOUNT_QUERY_EMAIL=True
# Application definition
DATE_INPUT_FORMATS = ('%d/%m/%Y','%d-%m-%Y','%Y-%m-%d')
USE_L10N = True
HOTJAR_SITE_ID ='3217621'
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'accounts.apps.AccountsConfig',
    'filters',
    'resetpassword',

    #3party login providers
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',

    #extra forms
    'crispy_forms',

    #django filters
    'django_filters',

    'analytical',
]

SOCIAL_AUTH_PIPELINE = (
  'social_core.pipeline.social_auth.social_details',
  'social_core.pipeline.social_auth.associate_by_email',
  'accounts.views.update_user_social_data'
)

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'Worki.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Worki.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-GB'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/
if DEBUG:
    STATIC_URL = '/static/'
    CRISPY_TEMPLATE_PACK = 'bootstrap4'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
    MEDIA_URL = '/media/'
else:
    STATIC_URL = '/static/'
    MEDIA_URL='static/media/'
    STATIC_ROOT=os.path.join(BASE_DIR,'static')
    MEDIA_ROOT=os.path.join(BASE_DIR,'static/media/')

# New configs

AUTH_USER_MODEL = 'accounts.CustomUser'
AUTHENTICATION_BACKENDS = ['accounts.backends.EmailBackend']
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        }
    }
}
LOGIN_REDIRECT_URL = 'home'
LOGIN_URL = 'login'
LOGOUT_REDIRECT_URL='home'
LOGIN_REDIRECT_URL = 'home'
ACCOUNT_LOGOUT_REDIRECT_URL = 'home'
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = "587"
EMAIL_USE_TLS=True
EMAIL_HOST_USER = "hello@worki.global"
EMAIL_HOST_PASSWORD = "sthpmwbfxydzgzrk"



