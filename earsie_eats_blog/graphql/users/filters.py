from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

from user_activities.choices import ACTIVITY_TYPES
from user_activities.models import Activity, Comment

from ..filters import DisplayChoiceFilter
from ..filterset import BaseFilterSet


class UserFilter(BaseFilterSet):

    class Meta:
        model = get_user_model()
        fields = '__all__'


class UserActivityFilter(BaseFilterSet):

    activity_type = DisplayChoiceFilter(choices=ACTIVITY_TYPES)

    class Meta:
        model = Activity
        fields = '__all__'


class UserCommentFilter(BaseFilterSet):

    class Meta:
        model = Comment
        fields = '__all__'


class AuthGroupFilter(BaseFilterSet):

    class Meta:
        model = Group
        fields = '__all__'


class AuthPermissionFilter(BaseFilterSet):

    class Meta:
        model = Permission
        fields = '__all__'


class ContentTypeFilter(BaseFilterSet):

    class Meta:
        model = ContentType
        fields = '__all__'
