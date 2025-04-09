from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'index.html')

def payment(request):
    return render(request, 'payment.html')

def transaction(request):
    return render(request, 'transaction.html')

def wallet(request):
    return render(request, 'wallet.html')

def investment(request):
    return render(request, 'investment.html')

def stock_fund(request):
    return render(request, 'stocksFund.html')

def notification(request):
    return render(request, 'notification.html')