from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    # We use re_path() due to limitations in URLRouter.
    # We define the websocket to get the notifications by user
    re_path(r"ws/meta-data/", consumers.NotificationConsumer.as_asgi()),
]
