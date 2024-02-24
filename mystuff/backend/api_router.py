from rest_framework import routers

from apps.stuff.api.viewsets import ItemViewSet, LocationViewSet

router = routers.DefaultRouter()

router.register('locations', LocationViewSet)
router.register('items', ItemViewSet)
