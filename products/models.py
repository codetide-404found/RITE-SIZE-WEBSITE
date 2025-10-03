from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ("food", "Food"),
        ("other", "Other"),
    ]

    name = models.CharField(max_length=200)   # product name
    description = models.TextField(blank=True)  # optional description
    price = models.DecimalField(max_digits=10, decimal_places=2)  # price
    created_at = models.DateTimeField(auto_now_add=True)  # auto timestamp
    stock = models.PositiveIntegerField(default=0)  # stock quantity
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default="other")
    image = models.ImageField(upload_to="product_images/", blank=True, null=True)  # product image
    available = models.BooleanField(default=True)
    def __str__(self):
        return self.name

