from graphene import Field, ObjectType
from graphene_django.debug import DjangoDebug

from .recipes.queries import RecipesQuery
from .users.queries import UsersQuery


class Query(ObjectType, RecipesQuery, UsersQuery):
    debug = Field(DjangoDebug, name='__debug')
