from django.contrib import admin

from .models import Location, Item


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'location', 'created', 'modified')
    list_filter = ['location']
    readonly_fields = ['created', 'modified']


admin.site.register(Location)
