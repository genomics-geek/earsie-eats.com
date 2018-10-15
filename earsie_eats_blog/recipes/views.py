from rest_framework import status
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import RecipeImageUploadSerializer


class RecipeImageUploadView(APIView):
    parser_classes = (JSONParser, MultiPartParser, )
    validation_serializer = RecipeImageUploadSerializer

    def put(self, request, format=None):
        serializer = self.validation_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        recipe = serializer.validated_data['recipe']
        image = serializer.validated_data['image']
        recipe.image = image
        recipe.save()

        return Response({"recipe": recipe.pk}, status.HTTP_200_OK)
