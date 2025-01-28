from django.shortcuts import render
from rest_framework import generics
from .models import Room
from .serializers import RoomSerializer
from rest_framework.response import Response  # Correct import

class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def get(self, request, *args, **kwargs):
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)  # Correct usage of Response
