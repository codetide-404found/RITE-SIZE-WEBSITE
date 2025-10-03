from django.contrib import admin
from django.utils.html import mark_safe
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "stock", "category", "available", "image_tag")
    list_filter = ("category", "available")
    search_fields = ("name", "description")

    def image_tag(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" width="60" height="60" style="object-fit: cover; border-radius: 5px;" />')
        return "No Image"

    image_tag.short_description = "Preview"
