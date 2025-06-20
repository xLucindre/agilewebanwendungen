from django.shortcuts import render, HttpResponse
from backend.models import Equipment
from backend.icon_map import get_icon_for_item
import re

# Create your views here.
def home(request):
    return render(request, "test.html", {"props": "Hello world"})

def register(request):
    return render(request, "register.html")

def login(request):
    return render(request, "login.html")

def extract_base_name(name):
    """
    Extract the base name from an item name by removing everything after the first parenthesis or +number
    @param {string} name - The full item name
    @return {string} The cleaned base name
    """
    base = re.split(r'\s*\(|\+\d+', name)[0].strip()
    return base

def gear_planner(request):
    """
    Gear planner view that provides equipment data for the frontend
    Maps gear slots to equipment types and generates upgrade level information
    """
    # Map gear slots to equipment types (only base items with upgrades=0)
    slot_map = {
        'main_weapon': 'main_weapon',
        'sub_weapon': 'sub_weapon',
        'awakening_weapon': 'awakening_weapon',
        'helmet': 'helmet',
        'armor': 'armor',
        'gloves': 'gloves',
        'shoes': 'shoes',
        'ring1': 'ring',
        'ring2': 'ring',
        'earring1': 'earring',
        'earring2': 'earring',
        'necklace': 'necklace',
        'belt': 'belt',
        # artifacts and alchemy_stone may be added later
    }
    
    def get_upgrade_levels(item):
        """
        Generate upgrade level labels based on item type
        @param {object} item - Item object with name and upgrades properties
        @return {list} List of upgrade level labels
        """
        roman = ['I', 'II', 'III', 'IV', 'V']
        max_up = item.upgrades
        
        # Blackstar: 0-15 in Arabic numerals, 16-20 in Roman numerals
        if 'Blackstar' in item.name:
            roman_count = max(0, max_up - 15)
            return [str(i) for i in range(0, 16)] + roman[:roman_count]
        
        # Labreska, Fallen God, Ator's, Dahn's: 0, I-V
        elif any(x in item.name for x in ['Labreska', 'Fallen God', "Ator's", "Dahn's"]):
            return ['0'] + roman[:max_up]
        
        # Other items: 0 to max_up in Arabic numerals
        else:
            return [str(i) for i in range(0, max_up+1)]

    gear_options = {}
    for slot, equip_type in slot_map.items():
        # Get only base items (upgrades=0) for the dropdown
        base_items = Equipment.objects.filter(equip_type=equip_type, upgrades=0).order_by('name')
        gear_options[slot] = []
        
        for item in base_items:
            # Find the maximum possible upgrade level for this item
            max_up_item = Equipment.objects.filter(equip_type=equip_type, name=item.name).order_by('-upgrades').first()
            max_up = max_up_item.upgrades if max_up_item else 0
            
            # Create temporary dummy object with .upgrades for get_upgrade_levels
            class Dummy:
                def __init__(self, name, upgrades):
                    self.name = name
                    self.upgrades = upgrades
            dummy = Dummy(item.name, max_up)
            
            # Get all upgrade levels for this item
            all_upgrades = Equipment.objects.filter(equip_type=equip_type, name=item.name).order_by('upgrades')
            levels = []
            upgrade_labels = get_upgrade_levels(dummy)
            
            for idx, up_item in enumerate(all_upgrades):
                label = upgrade_labels[idx] if idx < len(upgrade_labels) else str(up_item.upgrades)
                levels.append({
                    'level': label,
                    'ap': up_item.ap,
                    'dp': up_item.dp
                })
            
            gear_options[slot].append({
                'name': extract_base_name(item.name),
                'icon': get_icon_for_item(extract_base_name(item.name), equip_type),
                'upgrade_levels': [l['level'] for l in levels],
                'levels': levels
            })
    
    return render(request, "gear_planner.html", {"gear_options": gear_options})

def monster_zone_calc(request):
    return render(request, "monster_zone_calc.html")