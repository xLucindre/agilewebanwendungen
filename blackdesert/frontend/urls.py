from django.urls import path

from . import views
from django.shortcuts import redirect

urlpatterns = [
    path('', lambda request: redirect('gear_planner'), name='home'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('gear-planner/', views.gear_planner, name='gear_planner'),
    path('monster-zone-calc/', views.monster_zone_calc, name='monster_zone_calc'),
    path('bosses/', views.bosses, name='bosses'),
]