from graphene import Node, Field

from . import filters, types
from ..fields import ProtectedConnectionField


class UsersQuery(object):

    user = Node.Field(types.UserNode)
    all_users = ProtectedConnectionField(
        types.UserNode,
        filterset_class=filters.UserFilter,
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
