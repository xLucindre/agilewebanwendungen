# myapp/context_processors.py
from django.core.exceptions import ObjectDoesNotExist

def user_region(request):
    if request.user.is_authenticated:
        try:
            region = request.user.profile.region
        except ObjectDoesNotExist:
            region = "eu"
    else:
        region = None

    return {
        'user_region': region
    }