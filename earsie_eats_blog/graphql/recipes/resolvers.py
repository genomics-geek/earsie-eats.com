import os

from django.conf import settings
from django.db.models import Q

from user_activities.choices import ACTIVITY_TYPES


def resolve_image_url(root, info):
    return os.path.join(settings.MEDIA_URL, str(root.image))


def resolve_is_published(root, info):
    return root.is_published


def resolve_total_comments(root, info):
    return root.comments.filter(Q(active=True)).count()


def resolve_total_down_votes(root, info):
    down_vote = getattr(ACTIVITY_TYPES, 'down_vote')
    return root.user_activities \
        .filter(Q(activity_type=down_vote) & Q(active=True)) \
        .count()


def resolve_total_ingredients(root, info):
    return root.ingredients.count()


def resolve_total_steps(root, info):
    return root.steps.count()


def resolve_total_up_votes(root, info):
    up_vote = getattr(ACTIVITY_TYPES, 'up_vote')
    return root.user_activities \
        .filter(Q(activity_type=up_vote) & Q(active=True)) \
        .count()


def resolve_total_time(root, info):
    return root.total_time
