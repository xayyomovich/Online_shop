from .models import Products
from rest_framework import serializers


class ProductsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Products
        fields = ('id', 'name', 'image', 'price')