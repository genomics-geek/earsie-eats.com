from django.db.models import Count, Q

from graphene import Node, Field, ID, Int, String
from graphql_relay import from_global_id
from user_activities.choices import ACTIVITY_TYPES
from user_activities.models import Activity

from . import filters, types
from ..fields import ProtectedConnectionField
from ..utils import DictToObject


class UsersQuery(object):

    user = Node.Field(types.UserNode)
    all_users = ProtectedConnectionField(
        types.UserNode,
        filterset_class=filters.UserFilter,
    )

    user_activity = Node.Field(types.UserActivityNode)
    all_user_activities = ProtectedConnectionField(
        types.UserActivityNode,
        filterset_class=filters.UserActivityFilter,
    )

    user_comment = Node.Field(types.UserCommentNode)
    all_user_comments = ProtectedConnectionField(
        types.UserCommentNode,
        filterset_class=filters.UserCommentFilter,
    )

    auth_group = Node.Field(types.AuthGroupNode)
    all_auth_groups = ProtectedConnectionField(
        types.AuthGroupNode,
        filterset_class=filters.AuthGroupFilter,
    )

    auth_permission = Node.Field(types.AuthPermissionNode)
    all_auth_permissions = ProtectedConnectionField(
        types.AuthPermissionNode,
        filterset_class=filters.AuthPermissionFilter,
    )

    content_type = Node.Field(types.ContentTypeNode)
    all_content_types = ProtectedConnectionField(
        types.ContentTypeNode,
        filterset_class=filters.ContentTypeFilter,
    )

    current_user = Field(types.UserNode)

    def resolve_current_user(self, info):
        if info.context.user.is_authenticated:
            return info.context.user

    activity_counts = Field(
        types.ActivityCounts,
        user=ID(),
        app=String(required=True),
        model=String(required=True),
        object_id=Int(required=True)
    )

    def resolve_activity_counts(self, info, **kwargs):
        up_vote = getattr(ACTIVITY_TYPES, 'up_vote')
        down_vote = getattr(ACTIVITY_TYPES, 'down_vote')

        # NOTE: This is to filter out user votes
        user_pk = -1
        if kwargs.get('user'):
            _, user_pk = from_global_id(kwargs['user'])

        user_filter = Q(user__pk=user_pk)
        up_votes_filter = Q(activity_type=up_vote) & Q(active=True)
        down_votes_filter = Q(activity_type=down_vote) & Q(active=True)
        user_up_votes_filter = up_votes_filter & user_filter
        user_down_votes_filter = down_votes_filter & user_filter

        up_votes = Count('pk', filter=up_votes_filter, distinct=True)
        user_up_votes = Count('pk', filter=user_up_votes_filter, distinct=True)
        down_votes = Count('pk', filter=down_votes_filter, distinct=True)
        user_down_votes = Count('pk', filter=user_down_votes_filter, distinct=True)

        result = Activity.objects \
            .filter(
                Q(content_type__app_label__iexact=kwargs['app']) &
                Q(content_type__model__iexact=kwargs['model']) &
                Q(object_id=kwargs['object_id']) &
                Q(active=True)
            ) \
            .aggregate(
                up_votes=up_votes,
                down_votes=down_votes,
                user_up_votes=user_up_votes,
                user_down_votes=user_down_votes
            )

        return DictToObject(result)
