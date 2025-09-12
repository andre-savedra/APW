from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from .serializers import *
from .models import *
from random import randint
from rest_framework.response import Response
from datetime import date
from .utils import isPremium

GAIN_POINTS = 5
GAIN_POINTS_PREMIUM = 8
LOSS_POINTS = 1

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
#2 - apenas usuários 18 + podem fazer jogadas OK
#3 - apenas usuários com saldo positivo em MANGECOIN podem jogar

# SELECT balance FROM AccountToken at join Account a on 
# a.id = at.account_FK
# WHERE a.user_FK = 'request.user.id' AND 
# at.token_FK = 1;


class BetTryView(APIView):

    def get(self, request):

        if not request.user.is_authenticated:
            return Response(status=403,data='Usuário não está autenticado!')

        birth = request.user.birth_date
        today = date.today()
        age = today.year - birth.year - ((today.month, today.day) < (birth.month, birth.day))
        print(f"GROUPS: {request.user.groups.all()}")

        print("DATA DE NASCIMENTO DO USUÁRIO: ", birth)
        print("IDADE DO USUÁRIO: ", age)

        if age < 18:
            return Response(status=403,
                            data='Jogadas permitidas apenas p/ maiores de 18 anos.')


        # SELECT balance FROM AccountToken at join Account a on 
        # a.id = at.account_FK
        # WHERE a.user_FK = 'request.user.id' AND 
        # at.token_FK = 1;
        mangecoins = None
        try:
            # select *from Account where user_FK = x and closing_date is null;
            account = Account.objects.get(user_FK=request.user,closing_date__isnull=True)
            mangecoins = AccountToken.objects.get(account_FK=account,token_FK_id=1)
            if (mangecoins.balance < LOSS_POINTS):
                return Response(status=403,
                            data=f'Você não tem saldo suficiente em Mangecoin para fazer uma jogada. SALDO: {mangecoins.balance}')    
        except (AccountToken.DoesNotExist, Account.DoesNotExist):
            return Response(status=403,
                            data='Você não tem registros de Mangecoin. Compre o token para poder jogar.')

        # 3 roletas de 5 imagens (0,1,2,3,4)
        value1 = randint(0,4)
        value2 = randint(0,4)
        value3 = randint(0,4)

        #saldo antigo : 3
        old_balance = mangecoins.balance
        #verificar se o usuário ganhou ou perdeu
        if (value1 == value2 and value2 == value3):
            mangecoins.balance = mangecoins.balance + (
                GAIN_POINTS_PREMIUM if isPremium(request.user.id) 
                else GAIN_POINTS)
        else:
            mangecoins.balance = mangecoins.balance - LOSS_POINTS
        
        # update AccountToken set balance = new_balance where account_fk = x
        mangecoins.save()
        
        
        new_bet = Bet(
            account_FK=mangecoins.account_FK,
            is_loss=bool(old_balance > mangecoins.balance),
            input_amount=old_balance,
            output_amount=mangecoins.balance,
            value1=value1,
            value2=value2,
            value3=value3,
        )
        # insert into Bet values (....);
        new_bet.save()


        return Response(status=200,data={
            'bet1': value1,
            'bet2': value2,
            'bet3': value3,
            'new_balance': mangecoins.balance,
        })
    
