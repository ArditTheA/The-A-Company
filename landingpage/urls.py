from django.urls import path,include
from .views import *


urlpatterns = [
    path('home/',framer_view, {'path': 'home'}, ),
    path('home/<str:path>/', framer_view, name='framer'),
    path('products/<str:path>/', framer_view_products, ),
    path('pricing/', framer_view,{'path':'pricing'} ),
    path('about-us/', framer_view,{'path':'about-us'} ),
    path('coming-soon/', framer_view,{'path':'coming-soon'} ),
    path('blog/', framer_view,{'path':'blog'} ),


    

]