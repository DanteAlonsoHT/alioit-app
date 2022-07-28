import json
from api.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory
from django.contrib.auth.hashers import check_password

class RegistrationTest(APITestCase):

  def test_user_created_successfully(self):
    data = {
      "first_name": "test",
      "last_name": "test",
      "email": "test@test.com",
      "password": "testpassword",
      "age": 20
      }
    response = self.client.post("/api/users/", data)

    data_returned = json.loads(response.content)

    self.assertEqual(type(data_returned['id']), int)
    self.assertEqual(data_returned.get('password'), None)

    data_returned.pop('id')
    data.pop('password')

    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertEqual(data_returned, data)

  def test_first_name_is_required(self):
    data = {
      "last_name": "test",
      "email": "test@test.com",
      "password": "testpassword",
      "age": 20
      }
    response = self.client.post("/api/users/", data)
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    self.assertEqual(json.loads(response.content), {'first_name': ['This field is required.']})
  
  def test_last_name_is_required(self):
    data = {
      "first_name": "test",
      "email": "test@test.com",
      "password": "testpassword",
      "age": 20
      }
    response = self.client.post("/api/users/", data)
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    self.assertEqual(json.loads(response.content), {'last_name': ['This field is required.']})
  
  def test_email_is_required(self):
    data = {
      "first_name": "test",
      "last_name": "test",
      "password": "testpassword",
      "age": 20
      }
    response = self.client.post("/api/users/", data)
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    self.assertEqual(json.loads(response.content), {'email': ['This field is required.']})
  
  def test_password_is_required(self):
    data = {
      "first_name": "test",
      "last_name": "test",
      "email": "test@test.com",
      "age": 20
      }
    response = self.client.post("/api/users/", data)
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    self.assertEqual(json.loads(response.content), {'password': ['This field is required.']})

  def test_age_is_required(self):
    data = {
      "first_name": "test",
      "last_name": "test",
      "email": "test@test.com",
      "password": "testpassword",
      }
    response = self.client.post("/api/users/", data)
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    self.assertEqual(json.loads(response.content), {'age': ['This field is required.']})

  def test_unique_email_requested(self):
    data = {
      "first_name": "test",
      "last_name": "test",
      "email": "test@test.com",
      "password": "testpassword",
      "age": 20
      }
    data2 = {
      "first_name": "test",
      "last_name": "test",
      "email": "test@test.com",
      "password": "testpassword",
      "age": 20
      }
    response = self.client.post("/api/users/", data)
    response2 = self.client.post("/api/users/", data2)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertEqual(response2.status_code, status.HTTP_400_BAD_REQUEST)
    self.assertEqual(json.loads(response2.content), {'email': ['user with this email already exists.']})

  def test_email_valid(self):
    data = {
      "first_name": "test",
      "last_name": "test",
      "email": "test@test",
      "password": "testpassword",
      "age": 20
      }
    response = self.client.post("/api/users/", data)
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    self.assertEqual(json.loads(response.content), {'email': ['Enter a valid email address.']})
  
  def test_valid_age_value(self):
    data = {
      "first_name": "test",
      "last_name": "test",
      "email": "test@test.com",
      "password": "testpassword",
      "age": 20.42
      }
    data2 = {
      "first_name": "test",
      "last_name": "test",
      "email": "test@test.com",
      "password": "testpassword",
      "age": -20
      }
    response = self.client.post("/api/users/", data)
    response2 = self.client.post("/api/users/", data2)
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    self.assertEqual(response2.status_code, status.HTTP_400_BAD_REQUEST)
    self.assertEqual(json.loads(response.content), {'age': ['A valid integer is required.']})
    self.assertEqual(json.loads(response2.content), {'age': ['Ensure this value is greater than or equal to 0.']})

  def test_user_created_is_active(self):
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
    self.assertEqual(user.is_active, True)
  
  def test_user_created_is_not_staff_or_superuser(self):
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
    self.assertEqual(user.is_staff, False)
    self.assertEqual(user.is_superuser, False)

  def test_user_created_has_encrypted_password(self):
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
    self.assertNotEqual(user.password, "testpassword")
    self.assertEqual(check_password("testpassword", user.password), True)
