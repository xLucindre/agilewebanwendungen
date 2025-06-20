import os
import csv
from django.core.management.base import BaseCommand
from django.conf import settings
from pathlib import Path
from backend.models import Equipment

CSV_TYPE_MAP = {
    'MainWeapon.csv': 'main_weapon',
    'SubWeapon.csv': 'sub_weapon',
    'AwakeningWeapon.csv': 'awakening_weapon',
    'Armor.csv': 'armor',
    'Helmet.csv': 'helmet',
    'Gloves.csv': 'gloves',
    'Shoes.csv': 'shoes',
    'Ring.csv': 'ring',
    'Earring.csv': 'earring',
    'Necklace.csv': 'necklace',
    'Belt.csv': 'belt',
}

class Command(BaseCommand):
    help = 'Importiert Equipment aus allen CSV-Dateien im data-Ordner'

    def handle(self, *args, **kwargs):
        self.stdout.write(f"BASE_DIR: {settings.BASE_DIR}")
        data_dir = Path(settings.BASE_DIR) / 'data'
        self.stdout.write(f"data_dir: {data_dir}")
        for filename, equip_type in CSV_TYPE_MAP.items():
            path = data_dir / filename
            self.stdout.write(f"Prüfe: {path}")
            if not path.exists():
                self.stdout.write(self.style.WARNING(f"{filename} nicht gefunden, überspringe."))
                continue
            with path.open(newline='', encoding='utf-8') as f:
                reader = csv.DictReader(f, delimiter=';')
                for row in reader:
                    # Finde den richtigen Key für den Namen
                    name = row.get('Name') or row.get('\ufeffName')
                    if not name:
                        self.stdout.write(self.style.WARNING(f"Überspringe Zeile in {filename}: {row}"))
                        continue
                    try:
                        ap = row.get('AP', 0)
                        dp = row.get('DP', 0)
                        upgrades = row.get('Upgrades', 0)
                        Equipment.objects.update_or_create(
                            name=name,
                            upgrades=int(upgrades),
                            equip_type=equip_type,
                            defaults={
                                'ap': ap,
                                'dp': int(dp),
                                'extra_ap_monsters': None,
                            }
                        )
                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f"Fehler in {filename}: {e} | Zeile: {row}"))
            self.stdout.write(self.style.SUCCESS(f"{filename} importiert!"))
