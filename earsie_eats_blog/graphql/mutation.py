# -*- coding: utf-8 -*-
from graphene import Field, ObjectType
from graphene_django.debug import DjangoDebug

from .recipes.mutations import RecipesMutation
from .users.mutations import UsersMutation


class Mutation(ObjectType, RecipesMutation, UsersMutation):
    debug = Field(DjangoDebug, name='__debug')
