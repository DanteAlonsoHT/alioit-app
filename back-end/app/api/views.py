from django.contrib.auth.hashers import check_password
from rest_framework.authtoken.models import Token
from rest_framework import viewsets, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from .api_urls.get_pokemon_urls import all_data_urls
from .serializers import UserSerializer, SecretSerializer
from .models import User, Secret
from app import shared
from django.http import HttpResponse
import json

from asgiref.sync import async_to_sync
import asyncio
import time

import aiohttp
import requests
from django.shortcuts import render

URL_POKEMON_API = 'https://pokeapi.co/api/v2/'

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['post'])
    def login_api(self, request, pk=None):
        try:
            email = request.data['email']
            password = request.data['password']
            if not User.objects.filter(email=email):
                data_response = { 'error': { 'message': 'EMAIL_NOT_FOUND' }}
                return Response(data_response, status=status.HTTP_400_BAD_REQUEST)
            user = User.objects.get(email=email)
            password_encoded = user.password
            if check_password(password, password_encoded):
                if not user.is_active:
                    response = { 'error': { 'message': 'USER_NOT_ACTIVE' }}
                    return Response(response, status=status.HTTP_400_BAD_REQUEST)
                token = Token.objects.get(user_id=user.id).key
                queryset = User.objects.get(id=user.id)

                serializer = UserSerializer(queryset, many=False)
                response = {
                    'authToken': token,
                    'userDetails': serializer.data,
                }
                return Response(response)

            data_response = { 'error': { 'message': 'INVALID_PASSWORD' }}
            return Response(data_response, status=status.HTTP_400_BAD_REQUEST)
        except:
            data_response = { 'error': { 'message': 'SERVER_ERROR' }}
            return Response(data_response, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def my_proxy(self, request):
        data = async_to_sync(example())
        return Response(data)

    @action(detail=False, methods=['get'])
    def get_all_data_from_pokemon_api(self, request, pk=None):
        try:
            data_returned = []
            for index, url in enumerate(all_data_urls):
                data_returned.append({url.replace(URL_POKEMON_API, ''): all_pokemon_data[index]})  
            response = {
                'pokemonData': data_returned,
            }
            return Response(response)
        except:
            data_response = { 'error': { 'message': 'SERVER_ERROR' }}
            return Response(data_response, status=status.HTTP_400_BAD_REQUEST)
    
class SecretViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    queryset = Secret.objects.all()
    serializer_class = SecretSerializer

async def get_pokemon(session, url):
    async with session.get(url) as res:
        pokemon_data = await res.json()
        return pokemon_data

async def get_all_pokemon_from_urls(request):
    starting_time = time.time()
    actions = []
    pokemon_data = []
    data_returned = []

    async with aiohttp.ClientSession() as session:
        for url in all_data_urls:
            actions.append(asyncio.ensure_future(get_pokemon(session, url)))

        pokemon_res = await asyncio.gather(*actions)
        for data in pokemon_res:
            pokemon_data.append(data)

    count = len(pokemon_data)
    for index, url in enumerate(all_data_urls):
        data_returned.append({url.replace(URL_POKEMON_API, ''): pokemon_data[index]})
    total_time = time.time() - starting_time
    return HttpResponse([{'data': data_returned, 'total_time': total_time, 'total_request': len(all_data_urls)}])
        
