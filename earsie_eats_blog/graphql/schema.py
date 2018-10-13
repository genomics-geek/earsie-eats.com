from graphene import Schema
from . import query


schema = Schema(query=query.Query)
