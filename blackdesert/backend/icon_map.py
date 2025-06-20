ICON_MAP = {
    "Lebreska's Helmet": 'LabreskaHelmet.webp',
    "Fallen God's Armor": 'fallen_gods_armor.webp',
    "Dahn's Gloves": 'dahns gloves.webp',
    "Ator's Shoes": 'ators shoes.webp',
    "Kharazad Ring": 'kharazad_ring.webp',
    "Kharazad Necklace": 'kharazad necklace.webp',
    "Kharazad Belt": 'kharazad belt.webp',
    "Kharazad Earring": 'kharazad_earring.webp',
    "Sovereign Cestus": 'sovereign cestus.webp',
    "Sovereign Gauntlet": 'sovereign gauntlet.webp',
    "Blackstar Vambrace": 'blackstar vambrace.webp',
}

def get_icon_for_item(name, equip_type):
    """
    Get the icon filename for a given item name and equipment type
    @param {string} name - The item name
    @param {string} equip_type - The equipment type (e.g., 'main_weapon', 'armor')
    @return {string} The icon filename
    """
    # Convert to lowercase, remove special characters and +0/+1 etc.
    import re
    name_norm = re.sub(r'[^a-z0-9 ]', '', name.lower())
    
    for key, icon in ICON_MAP.items():
        key_norm = re.sub(r'[^a-z0-9 ]', '', key.lower())
        if key_norm in name_norm:
            # Icon match found
            return icon
    
    # Fallback: use slot icon
    return f'{equip_type}.png'
