from rest_framework import serializers
from ..models import Task, TaskStatus, TaskStatusImage

class TaskReadSerializer(serializers.ModelSerializer):
    from .custom_user import CustomUserSerializer
    from .equipment import EquipmentReadSerializer

    creator_FK = CustomUserSerializer()
    assignees_FK = CustomUserSerializer(many=True)
    equipments_FK = EquipmentReadSerializer(many=True)

    class Meta:
        model = Task   #model de conversão
        fields = '__all__' #todos os campos
        many = True        #permite serialização de vários


class TaskWriteSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Task   #model de conversão
        fields = '__all__' #todos os campos
        many = True        #permite serialização de vários

class TaskStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskStatus   #model de conversão
        fields = '__all__' #todos os campos
        many = True        #permite serialização de vários

class TaskStatusImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskStatusImage   #model de conversão
        fields = '__all__' #todos os campos
        many = True        #permite serialização de vários