from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

from graphene import Int, Node, ObjectType, String
from graphene_django import DjangoObjectType
from user_activities.models import Activity, Comment

from ..mixins import LoginRequiredMixin, PrimaryKeyMixin
from . import resolvers


class UserNode(PrimaryKeyMixin, DjangoObjectType):

    class Meta:
        model = get_user_model()
        interfaces = (Node, )


class UserActivityNode(PrimaryKeyMixin, DjangoObjectType):

    activity_type = String(resolver=resolvers.resolve_activity_type)

    class Meta:
        model = Activity
        interfaces = (Node, )


class UserCommentNode(PrimaryKeyMixin, DjangoObjectType):

    class Meta:
        model = Comment
        interfaces = (Node, )

    @classmethod
    def get_node(cls, info, pk):
        return Comment.objects.select_related('user').get(pk=pk)


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


class ActivityCounts(ObjectType):
    up_votes = Int()
    down_votes = Int()
    user_up_votes = Int()
    user_down_votes = Int()
    total_comments = Int()
