from django.conf import settings
from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.utils.text import slugify
from django.utils.translation import ugettext_lazy as _

from model_utils.models import TimeStampedModel


def image_directory_path(instance, filename):
    return 'recipe-images/{0}/{1}'.format(instance.slug, filename)


class Recipe(TimeStampedModel):
    """
    Notes:
        1. prep_time: Expected to be stored as minutes
        2. cook_time: Expected to be stored as minutes
    """

    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True)
    description = models.TextField()
    image = models.ImageField(upload_to=image_directory_path, blank=True, null=True)
    published = models.DateTimeField(null=True, blank=True)
    prep_time = models.DecimalField(decimal_places=2, max_digits=5)
    cook_time = models.DecimalField(decimal_places=2, max_digits=5)
    serving_size = models.DecimalField(decimal_places=2, max_digits=5)
    active = models.BooleanField(default=False)

    ingredients = models.ManyToManyField('recipes.Ingredient', blank=True)
    steps = models.ManyToManyField('recipes.Step', blank=True)

    comments = GenericRelation('user_activities.Comment')
    user_activities = GenericRelation('user_activities.Activity')

    class Meta:
        verbose_name = _('Recipe')
        verbose_name_plural = _('Recipes')
        unique_together = ('author', 'title')

    def __str__(self):
        return self.title

    @property
    def total_time(self):
        return self.prep_time + self.cook_time

    @property
    def is_published(self):
        return self.published is not None

    def save(self, **kwargs):
        self.slug = slugify(self.title)
        super(Recipe, self).save(**kwargs)


class Ingredient(TimeStampedModel):
    label = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True)
    active = models.BooleanField(default=False)

    class Meta:
        verbose_name = _('Ingredient')
        verbose_name_plural = _('Ingredients')

    def __str__(self):
        return self.label

    def save(self, **kwargs):
        self.slug = slugify(self.label)
        super(Ingredient, self).save(**kwargs)


class Step(TimeStampedModel):
    label = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True)
    active = models.BooleanField(default=False)

    class Meta:
        verbose_name = _('Step')
        verbose_name_plural = _('Steps')

    def __str__(self):
        return self.label

    def save(self, **kwargs):
        self.slug = slugify(self.label)
        super(Step, self).save(**kwargs)
