import json

#from channels.generic.websocket import AsyncWebsocketConsumer
from channels.generic.websocket import WebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .serializers import SecretSerializer
from api.models import Secret
#from asgiref.sync import sync_to_async

 
class NotificationConsumer(WebsocketConsumer):
  def connect(self):
    self.accept()
    self.group_name = "user"
    layer = get_channel_layer()
    serializer_secret = SecretSerializer(Secret.objects.all(), many=True)
    async_to_sync(layer.group_add)(self.group_name, self.channel_name)
    async_to_sync(layer.group_send)(
        self.group_name,
        {
            "type": "propagate_status",
            "message": serializer_secret.data
        },
    )

  def propagate_status(self, event):
    try:
      if True:
        message = event["message"]
        self.send(text_data=json.dumps(message))
    except:
      print("Error on Sending")
  
  def receive(self, text_data=None, bytes_data=None):
    try:
      if text_data:
          serializer_secret = SecretSerializer(Secret.objects.all(), many=True)
          async_to_sync(self.channel_layer.group_send)(
          self.group_name,
            {
              "type": "propagate_status",
              "message": serializer_secret.data
            },
          )
    except:
      print("Error on Receiving")
