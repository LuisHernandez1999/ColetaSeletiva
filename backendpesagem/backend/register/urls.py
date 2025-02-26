from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PesagemViewSet

router = DefaultRouter()  
router.register(r'pesagem', PesagemViewSet)  

urlpatterns = [
    path('', include(router.urls)),  
]
