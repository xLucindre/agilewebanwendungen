from django.contrib import admin
from .models import Equipment, UserGear

admin.site.register([Equipment, UserGear])