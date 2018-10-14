from graphene import Boolean, Float, Node
from graphene_django import DjangoObjectType

from earsie_eats_blog.recipes import models
from ..mixins import PrimaryKeyMixin
from . import resolvers


class RecipeNode(PrimaryKeyMixin, DjangoObjectType):

    is_published = Boolean(resolver=resolvers.resolve_is_published)
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
