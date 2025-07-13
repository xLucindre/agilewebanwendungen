from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db.models.signals import post_save
from django.dispatch import receiver
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
    
class UserGear(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gear_data = models.JSONField(default=dict)  # Stores selectedGear, enhancementLevels, etc.

    def __str__(self):
        return f"{self.user.username}'s Gear"

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    region = models.CharField(max_length=50, default='eu')

def get_region(self):
    try:
        return self.profile.region
    except ObjectDoesNotExist:
        return "eu"  # or a default like "Unknown"

User.add_to_class('region', property(get_region))

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()