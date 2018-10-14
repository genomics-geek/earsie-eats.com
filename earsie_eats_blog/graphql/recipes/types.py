from graphene import Boolean, Float, Int, Node, String
from graphene_django import DjangoObjectType

from earsie_eats_blog.recipes import models
from ..mixins import PrimaryKeyMixin
from . import resolvers


class RecipeNode(PrimaryKeyMixin, DjangoObjectType):

    image_url = String(resolver=resolvers.resolve_image_url)
    is_published = Boolean(resolver=resolvers.resolve_is_published)
    total_comments = Int(resolver=resolvers.resolve_total_comments)
    total_down_votes = Int(resolver=resolvers.resolve_total_down_votes)
    total_ingredients = Int(resolver=resolvers.resolve_total_ingredients)
    total_steps = Float(resolver=resolvers.resolve_total_steps)
    total_up_votes = Int(resolver=resolvers.resolve_total_up_votes)
    total_time = Float(resolver=resolvers.resolve_total_time)

    class Meta:
        model = models.Recipe
        interfaces = (Node, )


class IngredientNode(PrimaryKeyMixin, DjangoObjectType):
    class Meta:
        model = models.Ingredient
        interfaces = (Node, )


class StepNode(PrimaryKeyMixin, DjangoObjectType):
    class Meta:
        model = models.Step
        interfaces = (Node, )
