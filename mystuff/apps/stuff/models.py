from django.db import models


class Location(models.Model):
    name = models.CharField(max_length=100)
    position = models.PositiveSmallIntegerField(null=True, blank=True)

    class Meta:
        ordering = ['position']

    def __str__(self):
        return self.name


class Item(models.Model):
    location = models.ForeignKey(Location, models.SET_NULL, 'items', null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(upload_to='items/', null=True, blank=True)

    class Meta:
        ordering = ['-modified']

    def __str__(self):
        return self.name

