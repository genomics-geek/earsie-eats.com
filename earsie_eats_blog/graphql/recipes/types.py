from graphene import Node
from graphene_django import DjangoObjectType

from earsie_eats_blog.recipes import models
from ..mixins import LoginRequiredMixin, PrimaryKeyMixin


class RecipeNode(LoginRequiredMixin, PrimaryKeyMixin, DjangoObjectType):

    class Meta:
        model = models.Recipe
        interfaces = (Node, )


class IngredientNode(LoginRequiredMixin, PrimaryKeyMixin, DjangoObjectType):

    class Meta:
        model = models.Ingredient
        interfaces = (Node, )


class StepNode(LoginRequiredMixin, PrimaryKeyMixin, DjangoObjectType):

    class Meta:
        model = models.Step
        interfaces = (Node, )
