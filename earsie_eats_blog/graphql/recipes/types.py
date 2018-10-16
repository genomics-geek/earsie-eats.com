from django.db.models import Q

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

    @classmethod
    def get_node(cls, info, pk):
        return models.Recipe.objects \
            .select_related('author') \
            .prefetch_related('ingredients') \
            .prefetch_related('steps') \
            .get(pk=pk)

    def resolve_steps(self, info):
        return models.Step.objects \
            .filter(Q(recipe_step_relationships__recipe__pk=self.pk)) \
            .order_by('recipe_step_relationships__order') \
            .all()


class RecipeStepRelationshipNode(PrimaryKeyMixin, DjangoObjectType):

    class Meta:
        model = models.RecipeStepRelationship
        interfaces = (Node, )

    @classmethod
    def get_node(cls, info, pk):
        return models.RecipeStepRelationship.objects \
            .select_related('recipe') \
            .prefetch_related('step') \
            .get(pk=pk)


class IngredientNode(PrimaryKeyMixin, DjangoObjectType):
    class Meta:
        model = models.Ingredient
        interfaces = (Node, )


class StepNode(PrimaryKeyMixin, DjangoObjectType):
    class Meta:
        model = models.Step
        interfaces = (Node, )
