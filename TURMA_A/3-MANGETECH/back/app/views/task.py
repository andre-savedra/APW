from rest_framework.viewsets import ModelViewSet
from ..models import *
from ..serializers import *
from ..filters import TaskFilter
from django_filters.rest_framework import DjangoFilterBackend

class TaskView(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = TaskFilter