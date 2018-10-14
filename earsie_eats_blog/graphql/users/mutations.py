from django.contrib.contenttypes.models import ContentType
from django.db.models import Q

from graphene import Boolean, ID, Int, Mutation, String
from graphql_relay import from_global_id
from user_activities.choices import ACTIVITY_TYPES
from user_activities.models import Activity


class UpdateUserActivity(Mutation):

    class Arguments:
        app = String(required=True)
        model = String(required=True)
        object_id = Int(required=True)
        user = ID(required=True)
        activity_type = String(required=True)

    success = Boolean()

    def mutate(self, info, **kwargs):

        content_type = ContentType.objects.get(
            app_label__iexact=kwargs['app'],
            model__iexact=kwargs['model'],
        )
        activity_type = getattr(ACTIVITY_TYPES, kwargs['activity_type'])
        _, user_pk = from_global_id(kwargs['user'])

        Activity.objects.filter(
            Q(content_type=content_type) &
            Q(object_id=kwargs['object_id']) &
            Q(user__pk=user_pk) &
            ~Q(activity_type=activity_type)
        ).update(active=False)

        records = Activity.objects.filter(
            Q(content_type=content_type) &
            Q(object_id=kwargs['object_id']) &
            Q(user__pk=user_pk) &
            Q(activity_type=activity_type)
        )

        if len(records) == 0:
            Activity.objects.create(
                content_type=content_type,
                object_id=kwargs['object_id'],
                activity_type=activity_type,
                user_id=user_pk,
            )

        else:
            for record in records:
                if record.active:
                    record.active = False
                else:
                    record.active = True
                record.save()

        return UpdateUserActivity(success=True)


class UsersMutation(object):
    update_user_activity = UpdateUserActivity.Field()
