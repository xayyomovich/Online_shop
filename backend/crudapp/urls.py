from django.urls import path
from .views import GetProducts, CartView

urlpatterns = [
    path("products-list/", GetProducts.as_view(), name='products-list'),
    path("cart/", CartView.as_view(), name='cart-view'),
]










