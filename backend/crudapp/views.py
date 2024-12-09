from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from .models import Products
from .serializers import ProductsSerializer
from rest_framework.response import Response


class GetProducts(APIView):

    def get(self, request):
        products = Products.objects.all()
        serializer = ProductsSerializer(products, many=True)
        return Response(serializer.data, status=200)


class CartView(APIView):
    def get(self, request):
        cart = request.session.get('cart', [])
        return JsonResponse({'cart': cart}, safe=False)


# class PostCart(APIView):
#
#     def post(self, request):
#
#
#
#     def post(self, request):
#         product_id = request.data.get('product_id')
#         product = Products.objects.filter(id=product_id).first()
#
#         if product:
#             cart = request.session.get('cart', [])
#             cart.append({
#                 'id': product.id,
#                 'name': product.name,
#                 'price': str(product.price),
#                 'image': product.image.url if product.image else None
#             })
#             request.session['cart'] = cart
#             return JsonResponse({'message': 'Product added to cart', 'cart': cart})
#         return JsonResponse({'error': 'Product not found'}, status=404)
#
#     def delete(self, request):
#         product_id = request.data.get('product_id')
#         cart = request.session.get('cart', [])
#         cart = [item for item in cart if item['id'] != product_id]
#         request.session['cart'] = cart
#         return JsonResponse({'message': 'Product removed from cart', 'cart': cart})
