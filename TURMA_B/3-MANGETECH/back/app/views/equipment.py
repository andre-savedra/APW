from rest_framework.viewsets import ModelViewSet
from ..models import Equipment
from ..serializers import ReadWriteSerializer, EquipmentReadSerializer,EquipmentWriteSerializer

class EquipmentView(ReadWriteSerializer,ModelViewSet):
    queryset = Equipment.objects.all() #qual a tabela e a query
    read_serializer_class = EquipmentReadSerializer #qual o serializer
    write_serializer_class = EquipmentWriteSerializer