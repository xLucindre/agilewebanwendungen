from django.urls import path

from . import views
from . import user_management_views

urlpatterns = [
    path('register/', views.register_view, name='register_view'),
    path('login/', views.login_view, name='login_view'),
    path('logout/', views.logout_view, name='logout_view'),
    path('save_gear/', user_management_views.save_gear_view, name='save_gear'),
    path('get_gear/', user_management_views.get_gear_view, name='get_gear'),
    path('save_region/', views.save_region_view, name='save_region'),
]