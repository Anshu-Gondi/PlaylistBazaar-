from django.urls import path
from .views import RoomView, CreateRoomView

urlpatterns = [
    path('rooms/', RoomView.as_view(), name='room-list-create'),
    path('create-room/', CreateRoomView.as_view(), name='create-room'),
]
