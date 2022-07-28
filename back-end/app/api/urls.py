from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import UserViewSet, SecretViewSet
from api import views

router = routers.DefaultRouter()
router.register('users', UserViewSet, basename='user')
router.register('secrets', SecretViewSet, basename='secret')

urlpatterns = [
    path('', include(router.urls)),
    path('get_all_pokemon_from_urls/', views.get_all_pokemon_from_urls),
]
