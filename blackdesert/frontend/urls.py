from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('gear-planner/', views.gear_planner, name='gear_planner'),
    path('monster-zone-calc/', views.monster_zone_calc, name='monster_zone_calc'),
    path('bosses/', views.bosses, name='bosses'),
]