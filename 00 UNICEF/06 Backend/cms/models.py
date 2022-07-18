from statistics import mode
from django.db import models

class Region(models.Model):
    region = models.CharField(max_length=255)

    class Meta:
        verbose_name = "Region"
        verbose_name_plural = "Regions"
        
    def __str__(self):
        return self.region

class Province(models.Model):
    region = models.ForeignKey(Region, related_name="provinces", on_delete=models.CASCADE)
    province = models.CharField(max_length=255)
    
    class Meta:
        verbose_name = "Province"
        verbose_name_plural = "Provinces"
    
    def __str__(self):
        return self.province
    

class Municipality(models.Model):
    province = models.ForeignKey(Province, related_name="municipalities", on_delete=models.CASCADE)
    municipality = models.CharField(max_length=255)
    
    class Meta:
        verbose_name = "Municipality"
        verbose_name_plural = "Municipalities"
    
    def __str__(self):
        return self.municipality


class Barangay(models.Model):
    municipality = models.ForeignKey(Municipality, related_name="barangays", on_delete=models.CASCADE)
    barangay = models.CharField(max_length=255)
    
    class Meta:
        verbose_name = "Barangay"
        verbose_name_plural = "Barangays"
    
    def __str__(self):
        return self.barangay