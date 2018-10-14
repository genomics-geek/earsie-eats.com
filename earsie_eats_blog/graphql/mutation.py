# -*- coding: utf-8 -*-
from graphene import Field, ObjectType
from graphene_django.debug import DjangoDebug

from .users.mutations import UsersMutation


class Mutation(ObjectType, UsersMutation):
    debug = Field(DjangoDebug, name='__debug')
