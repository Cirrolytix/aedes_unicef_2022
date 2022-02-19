from dataclasses import asdict
from re import search
from django.contrib import admin

from cms.models import Barangay, Municipality, Province, Region

class RegionAdmin(admin.ModelAdmin):
    list_display = ("region", "province_count")
    search_fields = ("region",)
    search_help_text = "Search region by its name."
    
    @admin.display(description='Provinces')
    def province_count(self, obj):
        return obj.provinces.count()


class ProvinceAdmin(admin.ModelAdmin):
    list_display = ("province", "region_name", "municipality_count")
    list_filter = ("region__region",)
    search_fields = ("province", "region__region")
    search_help_text = "Search province by its name or region it belongs to."
    
    @admin.display(description='Region')
    def region_name(self, obj):
        return obj.region.region
    
    @admin.display(description='Municipalites')
    def municipality_count(self, obj):
        return obj.municipalities.count()
    
    
class MunicipalityAdmin(admin.ModelAdmin):
    list_display = ("municipality", "province_name", "barangay_count")
    list_filter = ("province__province",)
    search_fields = ("municipality", "province__province")
    search_help_text = "Search municipality by its name or province it belongs to."
    
    @admin.display(description='Province')
    def province_name(self, obj):
        return obj.province.province
    
    @admin.display(description='Barangays')
    def barangay_count(self, obj):
        return obj.barangays.count()
    

class BarangayAdmin(admin.ModelAdmin):
    list_display = ("barangay", "municipality_name")
    list_filter = ("municipality__municipality",)
    search_fields = ("barangay", "municipality__municipality")
    search_help_text = "Search barangay by its name or municipality it belongs to."
    
    @admin.display(description='Municipality')
    def municipality_name(self, obj):
        return obj.municipality.municipality
    

admin.site.register(Region, RegionAdmin)
admin.site.register(Province, ProvinceAdmin)
admin.site.register(Municipality, MunicipalityAdmin)
admin.site.register(Barangay, BarangayAdmin)