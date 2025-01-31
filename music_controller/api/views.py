from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Room
from .serializers import RoomSerializer, CreateRoomSerializer, UpdateRoomSerializer
from django.http import JsonResponse


class RoomView(generics.ListAPIView):  
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg, None)  # Ensure default None
        if not code:
            return Response({'error': 'Code parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

        room = Room.objects.filter(code=code)
        if room.exists():
            data = RoomSerializer(room.first()).data
            data['is_host'] = self.request.session.session_key == room.first().host
            return Response(data, status=status.HTTP_200_OK)
        
        return Response({'error': 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)

class JoinRoom(APIView):
    lookup_url_kwarg = 'code'

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get(self.lookup_url_kwarg, None)
        if not code:
            return Response({'error': 'Code parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

        room = Room.objects.filter(code=code).first()
        if room:
            self.request.session['room_code'] = code
            return Response({'message': 'Room Joined!'}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.validated_data.get('guest_can_pause')
            votes_to_skip = serializer.validated_data.get('votes_to_skip')
            host = self.request.session.session_key

            room, created = Room.objects.update_or_create(
                host=host,
                defaults={'guest_can_pause': guest_can_pause, 'votes_to_skip': votes_to_skip}
            )
            self.request.session['room_code'] = room.code
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

        return Response({'error': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class UserInRoom(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        data = {
            'code': self.request.session.get('room_code')
        }
        return JsonResponse(data, status=status.HTTP_200_OK)


class LeaveRoom(APIView):
    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            self.request.session.pop('room_code')
            host_id = self.request.session.session_key
            room = Room.objects.filter(host=host_id).first()
            if room:
                room.delete()

        return Response({'message': 'Successfully left the room'}, status=status.HTTP_200_OK)


class UpdateRoom(APIView):
    serializer_class = UpdateRoomSerializer

    def patch(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.validated_data.get('guest_can_pause')
            votes_to_skip = serializer.validated_data.get('votes_to_skip')
            code = serializer.validated_data.get('code')

            room = Room.objects.filter(code=code).first()
            if not room:
                return Response({'error': 'Room not found.'}, status=status.HTTP_404_NOT_FOUND)

            user_id = self.request.session.session_key
            if room.host != user_id:
                return Response({'error': 'You are not the host of this room.'}, status=status.HTTP_403_FORBIDDEN)

            room.guest_can_pause = guest_can_pause
            room.votes_to_skip = votes_to_skip
            room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid Data...'}, status=status.HTTP_400_BAD_REQUEST)
