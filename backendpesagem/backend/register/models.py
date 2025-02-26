
from django.db import models

class Pesagem(models.Model):
    peso_calculado = models.FloatField()
    data = models.DateTimeField()
    prefixo = models.CharField(max_length=50)
    motorista = models.CharField(max_length=100)
    cooperativa = models.CharField(max_length=100)
    tipo_veiculo = models.CharField(max_length=50)
    volume_carga = models.FloatField()

    def __str__(self):
        return f"Pesagem {self.id} - {self.motorista}"











