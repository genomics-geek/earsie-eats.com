from django.utils.timezone import now
from django.utils.text import slugify

from graphene import Boolean, ID, Field, Float, List, Mutation, String
from graphql_relay import from_global_id

from earsie_eats_blog.recipes.models import Ingredient, Recipe, RecipeStepRelationship, Step
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

        for order, label in enumerate(kwargs.get('steps', []), start=1):
            step, _ = Step.objects.get_or_create(
                slug=slugify(label),
                defaults={'label': label}
            )
            RecipeStepRelationship.objects.create(
                recipe=instance,
                step=step,
                order=order,
            )

        for label in kwargs.get('ingredients', []):
            ingredient, _ = Ingredient.objects.get_or_create(
                slug=slugify(label),
                defaults={'label': label}
            )
            instance.ingredients.add(ingredient)

        instance.save()

        return CreateRecipe(recipe=instance)


class EditRecipe(Mutation):

    class Arguments:
        id = ID(required=True)
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
        _, pk = from_global_id(kwargs.get('id'))
        instance = Recipe.objects.get(pk=pk)

        instance.active = kwargs.get('active', False)
        instance.published = now() if kwargs.get('active', False) else None
        instance.title = kwargs['title']
        instance.description = kwargs['description']
        instance.prep_time = kwargs['prep_time']
        instance.cook_time = kwargs['cook_time']
        instance.serving_size = kwargs['serving_size']

        ingredients = []
        for label in kwargs.get('ingredients', []):
            ingredient, _ = Ingredient.objects.get_or_create(
                slug=slugify(label),
                defaults={'label': label}
            )
            ingredients.append(ingredient)

        if len(kwargs.get('steps', [])) > 0:
            RecipeStepRelationship.objects.filter(recipe=instance).delete()

            for order, label in enumerate(kwargs.get('steps', []), start=1):
                step, _ = Step.objects.get_or_create(
                    slug=slugify(label),
                    defaults={'label': label}
                )
                RecipeStepRelationship.objects.create(
                    recipe=instance,
                    step=step,
                    order=order,
                )

        if len(ingredients) > 0:
            instance.ingredients.clear()
            instance.ingredients.add(*ingredients)

        instance.save()

        return EditRecipe(recipe=instance)


class RecipesMutation(object):
    create_recipe = CreateRecipe.Field()
    edit_recipe = EditRecipe.Field()
