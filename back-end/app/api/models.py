from pyexpat import model
from django.db import models
import jsonfield
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, User
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.postgres.fields import ArrayField
import channels.layers
from asgiref.sync import async_to_sync
from rest_framework import serializers

class UserProfileManager(BaseUserManager):
  def create_user(self, 
                  first_name,
                  last_name,
                  password = None,
                  email = None,
                  age = None,
                  ):
    if not first_name:
      raise ValueError("First name is a required field")

    if not last_name:
      raise ValueError("Last name is a required field")
    
    if not age:
      raise ValueError("Age is a required field")

    if email:
      email = self.normalize_email(email)
    
    user = self.model(first_name = first_name,
                      last_name = last_name,
                      email = email,
                      age = age,
                      )
    user.set_password(password)
    user.save(using=self._db)

    return user

  def create_superuser(self, 
                      first_name,
                      last_name,
                      email,
                      age,
                      password,
                      ):
    user = self.create_user(first_name,
                    last_name,
                    email,
                    age,
                    password,
                    )
    user.is_superuser = True
    user.is_staff = True
    
    user.save(using=self._db)

    return user

class User(AbstractBaseUser, PermissionsMixin):
  first_name = models.CharField(max_length=150, blank=False)
  last_name = models.CharField(max_length=150, blank=False)
  email = models.EmailField(max_length=255, blank=False, unique=True)
  age = models.PositiveIntegerField(blank=False)
  is_active = models.BooleanField(default=True)
  is_staff = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  objects = UserProfileManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['first_name', 'last_name']

  def get_full_name(self):
    return self.first_name, self.last_name

  def get_short_name(self):
    return self.first_name

  def __str__(self):
    return f'{self.email} - {self.age} years old'

class Secret(models.Model):
  secret = models.CharField(max_length=400, blank=False, unique=True)

  def save(self, *args, **kwargs):
    super().save(*args, **kwargs)
    channel_layer = channels.layers.get_channel_layer()
    group = 'user'
    serializer_secret = SecretSerializer(Secret.objects.all(), many=True)
    async_to_sync(channel_layer.group_send)(
        group,
        {
          "type": "propagate_status",
          "message": serializer_secret.data
        },
    )

class SecretSerializer(serializers.ModelSerializer):
  class Meta:
        model = Secret
        fields = '__all__'