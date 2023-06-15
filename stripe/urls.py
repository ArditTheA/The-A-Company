from django.urls import path
from . import views

urlpatterns = [
    path('payment/', views.payment_process, name='payment_process'),
    path('cancel/<str:subscription_id>/', views.cancel_subscription, name='cancel_subscription'),
    path('subscriptions/', views.subscription_details, name='subscription_details'),

]
