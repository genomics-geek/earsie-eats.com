from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

from graphene import Node, String
from graphene_django import DjangoObjectType
from user_activities.models import Activity, Comment

from ..mixins import LoginRequiredMixin, PrimaryKeyMixin
from . import resolvers


class UserNode(LoginRequiredMixin, PrimaryKeyMixin, DjangoObjectType):

    class Meta:
        model = get_user_model()
        interfaces = (Node, )


class UserActivityNode(LoginRequiredMixin, PrimaryKeyMixin, DjangoObjectType):

    activity_type = String(resolver=resolvers.resolve_activity_type)

    class Meta:
        model = Activity
        interfaces = (Node, )


class UserCommentNode(LoginRequiredMixin, PrimaryKeyMixin, DjangoObjectType):

    class Meta:
        model = Comment
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
