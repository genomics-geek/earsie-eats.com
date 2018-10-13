from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

from graphene import Node
from graphene_django import DjangoObjectType

from ..mixins import LoginRequiredMixin, PrimaryKeyMixin


class UserNode(LoginRequiredMixin, PrimaryKeyMixin, DjangoObjectType):

    class Meta:
        model = get_user_model()
        interfaces = (Node, )


class AuthGroupNode(LoginRequiredMixin, PrimaryKeyMixin, DjangoObjectType):

    class Meta:
        model = Group
        interfaces = (Node, )


class AuthPermissionNode(LoginRequiredMixin, PrimaryKeyMixin, DjangoObjectType):

    class Meta:
        model = Permission
        interfaces = (Node, )


class ContentTypeNode(LoginRequiredMixin, PrimaryKeyMixin, DjangoObjectType):

    class Meta:
        model = ContentType
        interfaces = (Node, )
