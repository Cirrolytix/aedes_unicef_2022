from email.policy import default
from rest_framework import serializers
from .models import Barangay, Municipality, Province, Region


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ["id","region"]


class ProvinceSerializer(serializers.ModelSerializer):
    region = RegionSerializer()
    class Meta:
        model = Province
        fields = ["id","province", "region"]


class MunicipalitySerializer(serializers.ModelSerializer):
    province = ProvinceSerializer()
    class Meta:
        model = Municipality
        fields = ["id","municipality", "province"]
        

class BarangaySerializer(serializers.ModelSerializer):
    municipality = MunicipalitySerializer()
    class Meta:
        model = Barangay
        fields = ["id","barangay", "municipality"]


class RegionProvinceSerializer(serializers.ModelSerializer):
    provinces = ProvinceSerializer(many=True)
    class Meta:
        model = Region
        fields = ["id","region", "provinces"]
        

class ProvinceMunicipalitySerializer(serializers.Serializer):
    municipalities = MunicipalitySerializer(many=True)
    class Meta:
        model = Region
        fields = ["id","province", "municipalities"]


class MunicipalityBarangaySerializer(serializers.Serializer):
    barangays = BarangaySerializer(many=True)
    class Meta:
        model = Barangay
        fields = ["id","municipality", "barangays"] 