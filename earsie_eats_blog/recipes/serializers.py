from rest_framework import serializers

from .models import Recipe


class RecipeImageUploadSerializer(serializers.Serializer):
    """Serializer for Uploading Recipe Images."""
    recipe = serializers.PrimaryKeyRelatedField(
        queryset=Recipe.objects.all(),
        allow_null=True,
    )
    image = serializers.FileField()
