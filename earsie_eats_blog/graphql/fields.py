from graphene import Int, Connection
from graphene_django.filter import DjangoFilterConnectionField
from .decorators import require_authenication


class ProtectedConnectionField(DjangoFilterConnectionField):

    @classmethod
    @require_authenication(info_position=9)
    def connection_resolver(cls, resolver, connection, default_manager, max_limit,
                            enforce_first_or_last, filterset_class, filtering_args,
                            root, info, **args):

        return super(ProtectedConnectionField, cls).connection_resolver(
            resolver,
            connection,
            default_manager,
            max_limit,
            enforce_first_or_last,
            filterset_class,
            filtering_args,
            root,
            info,
            **args
        )


class CountableConnectionBase(Connection):

    class Meta:
        abstract = True

    total_count = Int()

    def resolve_total_count(self, info, **kwargs):
        return self.iterable.count()
