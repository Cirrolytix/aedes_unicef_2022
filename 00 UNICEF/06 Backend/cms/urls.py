from django.urls import path

from cms.api import BarangayDetailView, BarangayListView, MunicipalityDetailView, MunicipalityListView, ProvinceDetailView, RegionDetailView, RegionListView, ProvinceListView


urlpatterns = [
    path("regions", RegionListView.as_view()),
    path("regions/<int:id>", RegionDetailView.as_view()),
    path("provinces", ProvinceListView.as_view()),
    path("provinces/<int:id>", ProvinceDetailView.as_view()),
    path("municipalities", MunicipalityListView.as_view()),
    path("municipalities/<int:id>", MunicipalityDetailView.as_view()),
    path("barangays", BarangayListView.as_view()),
    path("barangays/<int:id>", BarangayDetailView.as_view()),
]
