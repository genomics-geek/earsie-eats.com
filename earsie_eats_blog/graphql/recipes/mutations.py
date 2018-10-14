from django.utils.timezone import now

from graphene import Boolean, Field, Float, Mutation, String

from earsie_eats_blog.recipes.models import Recipe
from .types import RecipeNode


class CreateRecipe(Mutation):

    class Arguments:
        title = String(required=True)
        description = String(required=True)
        prep_time = Float(required=True)
        cook_time = Float(required=True)
        serving_size = Float(required=True)
        active = Boolean()

    recipe = Field(RecipeNode)

    def mutate(self, info, **kwargs):

        published = None
        active = kwargs.get('active', False)

        if active:
            published = now()

        instance = Recipe.objects.create(
            author=info.context.user,
            title=kwargs['title'],
            description=kwargs['description'],
            published=published,
            prep_time=kwargs['prep_time'],
            cook_time=kwargs['cook_time'],
            serving_size=kwargs['serving_size'],
            active=active,
        )

        return CreateRecipe(recipe=instance)


class RecipesMutation(object):
    create_recipe = CreateRecipe.Field()