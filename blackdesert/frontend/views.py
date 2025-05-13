from django.shortcuts import render, HttpResponse

# Create your views here.
def home(request):
    return render(request, "test.html", {"props": "Hello world"})

def register(request):
    return render(request, "register.html")

def login(request):
    return render(request, "login.html")