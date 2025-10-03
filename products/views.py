from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Product  # if you already created a Product model
import json


# ---------------- HOME / TEST ---------------- #
def home(request):
    return JsonResponse({"message": "Welcome to RITESIZE API"})


# ---------------- PRODUCTS ---------------- #
def product_list(request):
    """Return all products as JSON"""
    products = Product.objects.all().values("id", "name", "price", "description")
    return JsonResponse(list(products), safe=False)


def product_detail(request, product_id):
    """Return single product"""
    product = get_object_or_404(Product, id=product_id)
    data = {
        "id": product.id,
        "name": product.name,
        "price": product.price,
        "description": product.description,
    }
    return JsonResponse(data)


# ---------------- CART ---------------- #
@csrf_exempt
def add_to_cart(request):
    """Add product to session-based cart"""
    if request.method == "POST":
        body = json.loads(request.body)
        product_id = str(body.get("id"))
        quantity = int(body.get("qty", 1))

        cart = request.session.get("cart", {})

        if product_id in cart:
            cart[product_id] += quantity
        else:
            cart[product_id] = quantity

        request.session["cart"] = cart
        request.session.modified = True

        return JsonResponse({"cart": cart, "message": "Item added to cart"})


def view_cart(request):
    """Return current cart"""
    cart = request.session.get("cart", {})
    return JsonResponse({"cart": cart})


@csrf_exempt
def update_cart(request, item_id):
    """Update quantity of a cart item"""
    if request.method == "POST":
        body = json.loads(request.body)
        new_qty = int(body.get("qty", 1))

        cart = request.session.get("cart", {})
        if str(item_id) in cart:
            cart[str(item_id)] = new_qty
            request.session["cart"] = cart
            request.session.modified = True

        return JsonResponse({"cart": cart})


@csrf_exempt
def remove_from_cart(request, item_id):
    """Remove item from cart"""
    cart = request.session.get("cart", {})

    if str(item_id) in cart:
        del cart[str(item_id)]
        request.session["cart"] = cart
        request.session.modified = True

    return JsonResponse({"cart": cart})
