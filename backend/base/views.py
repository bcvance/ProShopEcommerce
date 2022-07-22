from django.shortcuts import render
from django.http import JsonResponse
from .products import products
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    return Response('hello')

@api_view(['GET'])
def getProducts(request):
    return Response(products).

@api_view(['GET'])
def getProduct(request, pk):
    product = (product for product in products if product['_id'] == pk)
    return Response(product)