from django.views.decorators.http import require_POST, require_GET
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import UserGear

@csrf_exempt
@require_POST
@login_required
def save_gear_view(request):
    import json
    try:
        data = json.loads(request.body)
        gear_data = data.get('gear_data', {})
        user_gear, created = UserGear.objects.get_or_create(user=request.user)
        user_gear.gear_data = gear_data
        user_gear.save()
        return JsonResponse({'status': 'success'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@require_GET
@login_required
def get_gear_view(request):
    try:
        user_gear = get_object_or_404(UserGear, user=request.user)
        return JsonResponse({'status': 'success', 'gear_data': user_gear.gear_data})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=404)