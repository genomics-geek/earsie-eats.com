import os

from django.conf import settings


def resolve_image_url(root, info):
    if root.image:
        return os.path.join(settings.MEDIA_URL, str(root.image))


def resolve_is_published(root, info):
    return root.is_published


def resolve_total_comments(root, info):
    return root.total_comments


def resolve_total_down_votes(root, info):
    return root.total_down_votes


def resolve_total_ingredients(root, info):
    return root.total_ingredients


def resolve_total_steps(root, info):
    return root.total_steps


def resolve_total_up_votes(root, info):
    return root.total_up_votes


def resolve_total_time(root, info):
    return root.total_time
