from django.db.models import Count, Q

from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField
from user_activities.choices import ACTIVITY_TYPES

from earsie_eats_blog.recipes.models import Recipe
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

    recipe_step_relationship = Node.Field(types.RecipeStepRelationshipNode)
    all_recipe_step_relationships = DjangoFilterConnectionField(
        types.RecipeStepRelationshipNode,
        filterset_class=filters.RecipeStepRelationshipFilter,
    )

    def resolve_all_recipes(self, info, **kwargs):
        down_vote = getattr(ACTIVITY_TYPES, 'down_vote')
        up_vote = getattr(ACTIVITY_TYPES, 'up_vote')

        comments_filter = Q(comments__active=True)
        down_votes_filter = (
            Q(user_activities__active=True) &
            Q(user_activities__activity_type=down_vote)
        )
        up_votes_filter = (
            Q(user_activities__active=True) &
            Q(user_activities__activity_type=up_vote)
        )

        total_steps = Count('steps', distinct=True)
        total_ingredients = Count('ingredients', distinct=True)
        total_comments = Count('comments', filter=comments_filter, distinct=True)
        total_down_votes = Count('user_activities', filter=down_votes_filter, distinct=True)
        total_up_votes = Count('user_activities', filter=up_votes_filter, distinct=True)

        return Recipe.objects \
            .select_related('author') \
            .annotate(total_steps=total_steps) \
            .annotate(total_ingredients=total_ingredients) \
            .annotate(total_comments=total_comments) \
            .annotate(total_down_votes=total_down_votes) \
            .annotate(total_up_votes=total_up_votes) \
            .all()
