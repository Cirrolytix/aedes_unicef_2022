from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Barangay, Municipality, Province, Region
from .serializers import BarangaySerializer, MunicipalityBarangaySerializer, MunicipalitySerializer, ProvinceMunicipalitySerializer, ProvinceSerializer, RegionProvinceSerializer, RegionSerializer


class RegionListView(APIView):
    
    def get(self, request):
        region_id = request.GET.get("region_id") 
        if region_id:
            regions =  Region.objects.get(region_id)
        else:
            regions =  Region.objects.all()
        serializer =  RegionSerializer(regions, many=True)
        return Response(serializer.data)

class RegionDetailView(APIView):
    
    def get(self, request, id):
        region = Region.objects.get(pk=id)
        serializer = RegionProvinceSerializer(region)
        return Response(serializer.data)

class ProvinceListView(APIView):
    
    def get(self, request):
        region_id = request.GET.get("region_id")
        if region_id:
            provinces = Province.objects.filter(region__pk=region_id)
        else:
            provinces = Province.objects.all()

        serializer =  ProvinceSerializer(provinces, many=True)
        return Response(serializer.data)
    
    
class ProvinceDetailView(APIView):
    
    def get(self, request, id):
        province = Province.objects.get(pk=id)
        serializer = ProvinceMunicipalitySerializer(province)
        return Response(serializer.data)
    

class MunicipalityListView(APIView):
    
    def get(self, request):
        province_id = request.GET.get("province_id")
        if province_id:
            municipalities = Municipality.objects.filter(province__pk=province_id)
        else:
            municipalities = Municipality.objects.all()

        serializer =  MunicipalitySerializer(municipalities, many=True)
        return Response(serializer.data)


class MunicipalityDetailView(APIView):
    
    def get(self, request, id):
        municipality = Municipality.objects.get(pk=id)
        serializer = MunicipalityBarangaySerializer(municipality)
        return Response(serializer.data)

class BarangayListView(APIView):
    
    def get(self, request):
        municipality_id = request.GET.get("region_id")
        if municipality_id:
            barangays = Barangay.objects.filter(region__pk=municipality_id)
        else:
            barangays = Barangay.objects.all()

        serializer =  BarangaySerializer(barangays, many=True)
        return Response(serializer.data)

class BarangayDetailView(APIView):
    
    def get(self, request, id):
        barangay = Barangay.objects.get(pk=id)
        serializer = BarangaySerializer(barangay)
        return Response(serializer.data)