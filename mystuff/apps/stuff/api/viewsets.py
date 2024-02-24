from rest_framework import viewsets
from ..models import Location, Item
from .serializers import LocationSerializer, ItemSerializer


class LocationViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing locations.
    """
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class ItemViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing items.
    """
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

