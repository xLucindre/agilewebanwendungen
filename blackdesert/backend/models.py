from django.db import models

# Create your models here.

class Equipment(models.Model):
    """
    Equipment model for Black Desert Online gear items
    Stores item information including stats and upgrade levels
    """
    EQUIP_TYPE_CHOICES = [
        ('main_weapon', 'Main Weapon'),
        ('sub_weapon', 'Sub Weapon'),
        ('awakening_weapon', 'Awakening Weapon'),
        ('armor', 'Armor'),
        ('helmet', 'Helmet'),
        ('gloves', 'Gloves'),
        ('shoes', 'Shoes'),
        ('ring', 'Ring'),
        ('earring', 'Earring'),
        ('necklace', 'Necklace'),
        ('belt', 'Belt'),
        # artifacts and alchemy_stone may be added later
    ]
    
    name = models.CharField(max_length=100)
    upgrades = models.IntegerField()
    ap = models.CharField(max_length=20)
    dp = models.IntegerField()
    extra_ap_monsters = models.IntegerField(null=True, blank=True)
    equip_type = models.CharField(max_length=32, choices=EQUIP_TYPE_CHOICES)

    def __str__(self):
        return f"{self.name} ({self.equip_type}) +{self.upgrades}"
