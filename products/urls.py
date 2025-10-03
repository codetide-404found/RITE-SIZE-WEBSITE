from django.urls import path
from . import views

urlpatterns = [
    # ---------- PRODUCTS ----------
    path("products/", views.product_list, name="product_list"),
    path("products/<int:pk>/", views.product_detail, name="product_detail"),

    # ---------- CART ----------
    path("cart/", views.cart, name="cart"),
    path("add_to_cart/", views.add_to_cart, name="add_to_cart"),
    path("update_cart/<int:item_id>/", views.update_cart, name="update_cart"),
    path("remove_from_cart/<int:item_id>/", views.remove_from_cart, name="remove_from_cart"),
]

