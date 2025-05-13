# myapp/context_processors.py

from datetime import datetime

def boss_timer_context(request):
    now = datetime.now().strftime("%H:%M:%S")
    return {
        "bossTimer": now
    }
