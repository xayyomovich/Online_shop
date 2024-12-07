from django.db import models


class Products(models.Model):
    name = models.CharField(max_length=30)
    image = models.ImageField(upload_to='products/', null=True)
    price = models.DecimalField(max_digits=10, decimal_places=1)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "products"