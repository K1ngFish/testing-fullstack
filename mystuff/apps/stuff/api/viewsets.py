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

    def get_queryset(self):
        queryset = self.queryset
        location_id = self.request.query_params.get('location')
        if location_id is not None:
            try:
                location = Location.objects.get(id=location_id)
            except Location.DoesNotExist:
                pass
            queryset = queryset.filter(location = location)
        return queryset

