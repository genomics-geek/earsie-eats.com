# -*- coding: utf-8 -*-
from django.conf.urls import url

from .views import RecipeImageUploadView


urlpatterns = [
    url(r'^upload-image/$', RecipeImageUploadView.as_view()),
]
