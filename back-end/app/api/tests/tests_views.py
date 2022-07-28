import json
from api.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory
from django.contrib.auth.hashers import check_password

class RestUserTest(APITestCase):

  def test_get_all_users(self):
    response = self.client.get("/api/users/")
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(len(json.loads(response.content)), 0)
    data = {
      "first_name": "test",
      "last_name": "test",
      "email": "test@test.com",
      "password": "testpassword",
      "age": 20
      }
    response = self.client.post("/api/users/", data)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    response = self.client.get("/api/users/")
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(len(json.loads(response.content)), 1)
    data = {
      "first_name": "test",
      "last_name": "test",
      "email": "test2@test.com",
      "password": "testpassword",
      "age": 20
      }
    response = self.client.post("/api/users/", data)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    response = self.client.get("/api/users/")
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(len(json.loads(response.content)), 2)

  def test_get_single_user(self):
    data = {
      "first_name": "test",
      "last_name": "test",
      "email": "test@test.com",
      "password": "testpassword",
      "age": 20
      }
    response = self.client.post("/api/users/", data)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    user = User.objects.get(email="test@test.com")
    response = self.client.get(f'/api/users/{user.id}/')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    copy_response = json.loads(response.content)
    copy_response.pop('id')
    data.pop('password')
    self.assertEqual(copy_response, data)
    response = self.client.get('/api/users/2/')
    self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
  
  def test_update_data_from_user(self):
    data = {
      "first_name": "test",
      "last_name": "test",
      "email": "test@test.com",
      "password": "testpassword",
      "age": 20
      }
    response = self.client.post("/api/users/", data)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertEqual(json.loads(response.content)['first_name'], 'test')
    self.assertEqual(json.loads(response.content)['last_name'], 'test')
    user = User.objects.get(email="test@test.com")
    new_data = {
      "first_name": "testc",
      "last_name": "testc",
      "email": "test@test.com",
      "password": "testpassword",
      "age": 20
      }
    response = self.client.put(f'/api/users/{user.id}/', new_data)
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(json.loads(response.content)['first_name'], 'testc')
    self.assertEqual(json.loads(response.content)['last_name'], 'testc')

  def test_delete_user(self):
    data = {
      "first_name": "test",
      "last_name": "test",
      "email": "test@test.com",
      "password": "testpassword",
      "age": 20
      }
    response = self.client.post("/api/users/", data)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    user = User.objects.get(email="test@test.com")
    response = self.client.delete(f'/api/users/{user.id}/')
    self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    user = User.objects.filter(email="test@test.com")
    self.assertEqual(len(user), 0)