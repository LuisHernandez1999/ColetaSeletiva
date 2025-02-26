# register/serializers.py
from rest_framework import serializers
from .models import Pesagem

class PesagemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pesagem
        fields = '__all__'  # todos os campos do modelo serão expostos no JSON 
      

