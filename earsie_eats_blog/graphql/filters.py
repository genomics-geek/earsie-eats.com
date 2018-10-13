from django.db.models import Q

from django_filters import BaseInFilter, Filter
from graphql_relay import from_global_id


class GlobalIDFilter(Filter):

    def filter(self, qs, value):
        gid = from_global_id(value)[1]
        return super(GlobalIDFilter, self).filter(qs, gid)


class GlobalIDInFilter(BaseInFilter):

    def filter(self, qs, value):
        gids = [from_global_id(v)[1] for v in value]
        return super(GlobalIDInFilter, self).filter(qs, gids)


class SearchFilter(Filter):

    def __init__(self, search_fields, **kwargs):
        super(SearchFilter, self).__init__(**kwargs)
        self.search_fields = search_fields

    def filter(self, qs, value):
        filter = Q()
        for search_field in self.search_fields:
            filter |= Q(**{'{0}__icontains'.format(search_field): value})
        return qs.filter(filter).distinct()
