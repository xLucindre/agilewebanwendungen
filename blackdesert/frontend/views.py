from django.shortcuts import render, HttpResponse
from backend.models import Equipment, UserGear
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

ROMAN_TO_INT = {
    'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5,
    'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10,
    'XI': 11, 'XII': 12, 'XIII': 13, 'XIV': 14, 'XV': 15
}

def enhancement_to_int(enh, item_name=None):
    if enh is None:
        return 0
    try:
        return int(enh)
    except (TypeError, ValueError):
        roman = str(enh).upper()
        if item_name and 'BLACKSTAR' in item_name.upper():
            roman_map = {'I': 16, 'II': 17, 'III': 18, 'IV': 19, 'V': 20}
            return roman_map.get(roman, 0)
        return ROMAN_TO_INT.get(roman, 0)

def monster_zone_calc(request):
    ap = None
    aap = None
    dp = None
    if request.user.is_authenticated:
        try:
            user_gear = UserGear.objects.get(user=request.user)
            gear_data = user_gear.gear_data
            selected_gear = gear_data.get('selectedGear', {})
            enhancement_levels = gear_data.get('enhancementLevels', {})

            gear_slots = [
                'main_weapon', 'awakening_weapon', 'sub_weapon', 'helmet', 'armor', 'gloves', 'shoes',
                'ring1', 'ring2', 'earring1', 'earring2', 'necklace', 'belt'
            ]
            extra_slots = ['artifact1', 'artifact2', 'alchemy_stone']

            ap_val_total = 0
            aap_val_total = 0
            dp_val_total = 0

            for slot in gear_slots + extra_slots:
                item_name = selected_gear.get(slot)
                if not item_name or item_name == 'None':
                    continue
                enhancement = enhancement_levels.get(slot)
                enhancement = enhancement_to_int(enhancement, item_name)
                try:
                    eq = Equipment.objects.get(name=item_name, equip_type=slot.replace('1','').replace('2',''), upgrades=enhancement)
                except Equipment.DoesNotExist:
                    eq = None
                if eq:
                    ap_str = str(eq.ap) if eq.ap else ''
                    match = re.match(r"(\d+)", ap_str)
                    ap_val = int(match.group(1)) if match else 0
                    dp_val = int(eq.dp) if eq.dp else 0

                    # AP
                    if slot == 'awakening_weapon':
                        aap_val_total += ap_val
                    elif slot == 'main_weapon':
                        ap_val_total += ap_val
                    else:
                        ap_val_total += ap_val
                        aap_val_total += ap_val

                    # DP nur für gear_slots
                    if slot in gear_slots:
                        dp_val_total += dp_val
            ap = ap_val_total
            aap = aap_val_total
            dp = dp_val_total
        except UserGear.DoesNotExist:
            pass
    return render(request, "monster_zone_calc.html", {"ap": ap, "aap": aap, "dp": dp})


def bosses(request):
    return render(request, "bosses.html")
    