from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom, JoinRoom, UserInRoom, LeaveRoom, UpdateRoom

urlpatterns = [
    path('rooms/', RoomView.as_view(), name='room-list-create'),#DON't change
    path('create-room/', CreateRoomView.as_view(), name='create-room'),#DON't change
    # NEEDED TO FIX
    path('get-room', GetRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('user-in-room', UserInRoom.as_view()),
    path('leave-room', LeaveRoom.as_view()),
    path('update-room', UpdateRoom.as_view()),
]
