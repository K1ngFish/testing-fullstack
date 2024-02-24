from rest_framework import serializers
from ..models import Location, Item


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = [
            'id',
            'name',
            'position']


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = [
            'id',
            'name',
            'location',
            'created',
            'modified',
            'image'
        ]