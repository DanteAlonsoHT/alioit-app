from rest_framework import serializers
from .models import User, Secret
from rest_framework.authtoken.models import Token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id',
                'first_name',
                'last_name',
                'email',
                'password',
                'age',
                ]

        extra_kwargs = {'password': {'write_only': True, 'required': True }}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class SecretSerializer(serializers.ModelSerializer):
  class Meta:
        model = Secret
        fields = '__all__'
