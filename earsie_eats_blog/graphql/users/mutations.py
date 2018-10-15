from django.contrib.contenttypes.models import ContentType
from django.db.models import Q

from graphene import Boolean, Field, ID, Int, Mutation, String
from graphql_relay import from_global_id
from user_activities.choices import ACTIVITY_TYPES
from user_activities.models import Activity, Comment

from .types import UserCommentNode


class DeleteUserComment(Mutation):

    class Arguments:
        id = String(required=True)

    comment = Field(UserCommentNode)

    def mutate(self, info, **kwargs):

        _, commentPK = from_global_id(kwargs['id'])
        comment = Comment.objects.get(pk=commentPK)
        comment.active = False
        comment.save()

        return DeleteUserComment(comment=comment)


class ManageUserComment(Mutation):

    class Arguments:
        text = String(required=True)
        id = String()
        app = String()
        model = String()
        object_id = Int()

    comment = Field(UserCommentNode)

    def mutate(self, info, **kwargs):

        commentId = kwargs.get('id', None)
        if commentId:
            _, commentPK = from_global_id(commentId)
            comment = Comment.objects.get(pk=commentPK)
            comment.text = kwargs['text']
            comment.save()

        else:
            content_type = ContentType.objects.get(
                app_label__iexact=kwargs['app'],
                model__iexact=kwargs['model']
            )
            comment = Comment.objects.create(
                user=info.context.user,
                text=kwargs['text'],
                object_id=kwargs['object_id'],
                content_type=content_type,
            )

        return ManageUserComment(comment=comment)


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
    manage_user_comment = ManageUserComment.Field()
    delete_user_comment = DeleteUserComment.Field()
