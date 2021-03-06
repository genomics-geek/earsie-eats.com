from django.db.models import F

from django_filters import CharFilter

from earsie_eats_blog.recipes import models
from ..filters import GlobalIDInFilter, SearchFilter
from ..filterset import BaseFilterSet


class RecipeFilter(BaseFilterSet):

    author_in = GlobalIDInFilter(field_name='author__id', distinct=True)
    total_time = CharFilter(label='Total Time', method='filter_total_time')
    search = SearchFilter(search_fields=['title', 'description', 'steps__label', 'ingredients__label'])
    ingredients = GlobalIDInFilter(field_name='ingredients__id', distinct=True)

    class Meta:
        model = models.Recipe
        fields = '__all__'

    def filter_total_time(self, qs, field_name, value):
        return qs.annotate(total=F('cook_time') + F('prep_time')) \
            .filter(total__lte=value)


class IngredientFilter(BaseFilterSet):

    class Meta:
        model = models.Ingredient
        fields = '__all__'


class StepFilter(BaseFilterSet):

    class Meta:
        model = models.Step
        fields = '__all__'


class RecipeStepRelationshipFilter(BaseFilterSet):

    class Meta:
        model = models.RecipeStepRelationship
        fields = '__all__'
