from rest_framework import serializers
from ..models import Equipment


class EquipmentReadSerializer(serializers.ModelSerializer):
    from .category import CategorySerializer
    from .environment import EnvironmentSerializer

    # opção com os dados completos:
    # category_FK = CategorySerializer()
    
    # opção de pegar apenas o campo name da categoria
    category_FK = serializers.SlugRelatedField(
        slug_field='name',
        read_only=True
    )

    environment_FK = EnvironmentSerializer()

    class Meta:
        model = Equipment   #model de conversão
        fields = '__all__' #todos os campos
        many = True        #permite serialização de vários

class EquipmentWriteSerializer(serializers.ModelSerializer):      
    class Meta:
        model = Equipment   #model de conversão
        fields = '__all__' #todos os campos
        many = True        #permite serialização de vários