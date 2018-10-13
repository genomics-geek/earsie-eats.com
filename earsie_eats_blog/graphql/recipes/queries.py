from graphene import Node

from . import filters, types
from ..fields import ProtectedConnectionField


class RecipesQuery(object):

    recipe = Node.Field(types.RecipeNode)
    all_recipes = ProtectedConnectionField(
        types.RecipeNode,
        filterset_class=filters.RecipeFilter,
    )

    ingredient = Node.Field(types.IngredientNode)
    all_ingredients = ProtectedConnectionField(
        types.IngredientNode,
        filterset_class=filters.IngredientFilter,
    )

    step = Node.Field(types.StepNode)
    all_steps = ProtectedConnectionField(
        types.StepNode,
        filterset_class=filters.StepFilter,
    )
