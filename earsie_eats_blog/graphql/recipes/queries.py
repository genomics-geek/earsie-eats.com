from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField

from . import filters, types


class RecipesQuery(object):

    recipe = Node.Field(types.RecipeNode)
    all_recipes = DjangoFilterConnectionField(
        types.RecipeNode,
        filterset_class=filters.RecipeFilter,
    )

    ingredient = Node.Field(types.IngredientNode)
    all_ingredients = DjangoFilterConnectionField(
        types.IngredientNode,
        filterset_class=filters.IngredientFilter,
    )

    step = Node.Field(types.StepNode)
    all_steps = DjangoFilterConnectionField(
        types.StepNode,
        filterset_class=filters.StepFilter,
    )
