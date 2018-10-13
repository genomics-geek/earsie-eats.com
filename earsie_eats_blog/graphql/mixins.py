from graphene import Int

from .decorators import require_authenication


class PrimaryKeyMixin(object):
    pk = Int(source='pk')


class LoginRequiredMixin(object):

    @classmethod
    @require_authenication(info_position=1)
    def get_node(cls, info, id):
        return super(LoginRequiredMixin, cls).get_node(info, id)
