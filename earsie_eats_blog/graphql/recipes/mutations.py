from django.utils.timezone import now
from django.utils.text import slugify

from graphene import Boolean, Field, Float, List, Mutation, String

from earsie_eats_blog.recipes.models import Ingredient, Recipe, Step
from .types import RecipeNode


class CreateRecipe(Mutation):

    class Arguments:
        title = String(required=True)
        description = String(required=True)
        prep_time = Float(required=True)
        cook_time = Float(required=True)
        serving_size = Float(required=True)
        ingredients = List(String)
        steps = List(String)
        active = Boolean()

    recipe = Field(RecipeNode)

    def mutate(self, info, **kwargs):

        published = None
        active = kwargs.get('active', False)

        if active:
            published = now()

        instance, _ = Recipe.objects.get_or_create(
            slug=slugify(kwargs['title']),
            defaults={
                "author": info.context.user,
                "title": kwargs['title'],
                "description": kwargs['description'],
                "published": published,
                "prep_time": kwargs['prep_time'],
                "cook_time": kwargs['cook_time'],
                "serving_size": kwargs['serving_size'],
                "active": active,
            }
        )

        steps = []
        for label in kwargs.get('steps', []):
            step, _ = Step.objects.get_or_create(
                slug=slugify(label),
                defaults={'label': label}
            )
            steps.append(step)

        ingredients = []
        for label in kwargs.get('ingredients', []):
            ingredient, _ = Ingredient.objects.get_or_create(
                slug=slugify(label),
                defaults={'label': label}
            )
            ingredients.append(ingredient)

        if len(steps) > 0:
            instance.steps.clear()
            instance.steps.add(*steps)

        if len(ingredients) > 0:
            instance.ingredients.clear()
            instance.ingredients.add(*ingredients)

        instance.save()

        return CreateRecipe(recipe=instance)


class RecipesMutation(object):
    create_recipe = CreateRecipe.Field()
