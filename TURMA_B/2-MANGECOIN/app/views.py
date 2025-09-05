from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from .serializers import *
from .models import *
from random import randint
from rest_framework.response import Response

class CustomUserView(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

class AccountView(ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class TokenView(ModelViewSet):
    queryset = Token.objects.all()
    serializer_class = TokenSerializer
    
class AccountTokenView(ModelViewSet):
    queryset = AccountToken.objects.all()
    serializer_class = AccountTokenSerializer

class TransactionView(ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class BetView(ModelViewSet):
    queryset = Bet.objects.all()
    serializer_class = BetSerializer


#1 - apenas usuários autenticados podem fazer jogadas OK
#2 - apenas usuários 18 + podem fazer jogadas
#3 - apenas usuários com saldo positivo em MANGECOIN podem jogar

class BetTryView(APIView):

    def get(self, request):

        if not request.user.is_authenticated:
            return Response(status=403,data='Usuário não está autenticado!')


        # 3 roletas de 5 imagens (0,1,2,3,4)
        value1 = randint(0,4)
        value2 = randint(0,4)
        value3 = randint(0,4)


        return Response(status=200,data={
            'bet1': value1,
            'bet2': value2,
            'bet3': value3
        })