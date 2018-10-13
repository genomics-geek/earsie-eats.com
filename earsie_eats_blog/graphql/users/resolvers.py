from user_activities.choices import ACTIVITY_TYPES


def resolve_activity_type(root, info):
    return ACTIVITY_TYPES[root.activity_type]
