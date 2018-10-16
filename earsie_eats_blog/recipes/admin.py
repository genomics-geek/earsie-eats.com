# -*- coding: utf-8
from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline

from reversion.admin import VersionAdmin
from user_activities.models import Activity, Comment

from . import models


class ActivityInline(GenericTabularInline):
    model = Activity
    raw_id_fields = ('user', )


class CommentInline(GenericTabularInline):
    model = Comment
    raw_id_fields = ('user', 'content_type', 'tags')


class RecipeStepRelationshipInline(admin.TabularInline):
    model = models.RecipeStepRelationship
    raw_id_fields = ('recipe', 'step')


class RecipeAdmin(VersionAdmin):
    model = models.Recipe
    inlines = [ActivityInline, CommentInline, RecipeStepRelationshipInline]
    list_display = ('author', 'title', 'total_time', 'is_published', 'published', 'active', 'created', 'modified')
    prepopulated_fields = {'slug': ('title', )}
    raw_id_fields = ('author', 'ingredients', 'steps')
    search_fields = ('title', 'description')
    list_filter = ('active', )
    save_as = True


class IngredientAdmin(admin.ModelAdmin):
    model = models.Ingredient
    list_display = ('label', 'active', 'created', 'modified')
    prepopulated_fields = {'slug': ('label', )}
    search_fields = ('label', )
    list_filter = ('active', )
    save_as = True


class StepAdmin(admin.ModelAdmin):
    model = models.Step
    inlines = [RecipeStepRelationshipInline]
    list_display = ('label', 'active', 'created', 'modified')
    prepopulated_fields = {'slug': ('label', )}
    search_fields = ('label', )
    list_filter = ('active', )
    save_as = True


class RecipeStepRelationshipAdmin(admin.ModelAdmin):
    model = models.RecipeStepRelationship
    list_display = ('recipe', 'step', 'order', 'created', 'modified')
    search_fields = ('recipe_title', 'step__label', 'ingredient__label')
    save_as = True


admin.site.register(models.Recipe, RecipeAdmin)
admin.site.register(models.Ingredient, IngredientAdmin)
admin.site.register(models.Step, StepAdmin)
admin.site.register(models.RecipeStepRelationship, RecipeStepRelationshipAdmin)
