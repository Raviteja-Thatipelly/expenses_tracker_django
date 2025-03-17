from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name='app_landing'),
    path('payment/',views.payment,name='payment'),
    path('transaction/',views.transaction,name='transaction'),
    path('wallet/',views.wallet,name='wallet'),
    path('investment/',views.investment,name='investment'),
    path('stocksFund/',views.stock_fund,name='stocksFund'),
]