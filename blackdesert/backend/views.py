from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.http import JsonResponse

def home(request):
    return HttpResponse("Home World")

@require_POST
def register_view(request):
    username = request.POST['username']
    password1 = request.POST['password1']
    password2 = request.POST['password2']

    if password1 != password2:
        return JsonResponse({"error": "Passwords do not match."})

    if User.objects.filter(username=username).exists():
        return JsonResponse({"error": "Username already exists."})

    user = User.objects.create_user(username=username, password=password1)
    user.save()
    return JsonResponse({"redirect": "/login"})


@require_POST
def login_view(request):
    username = request.POST['username']
    password = request.POST['password']

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return JsonResponse({"redirect": "/"})
    else:
        return JsonResponse({"error": "Invalid username or password."})


@require_POST
@login_required
def logout_view(request):
    logout(request)
    return JsonResponse({"redirect": "/"})

