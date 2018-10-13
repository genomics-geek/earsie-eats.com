from functools import wraps

from django.core.exceptions import PermissionDenied


def require_authenication(info_position):
    """Will enforce the user is authenticated

    Arguments:
        info_position (int): The position of the info parameter in the wrapped function

    Returns:
        func: decorator function
    """
    def require_permission_decorator(func):
        @wraps(func)
        def func_wrapper(*args, **kwargs):
            if not args[info_position].context.user.is_authenticated:
                raise PermissionDenied('Permission Denied')
            return func(*args, **kwargs)
        return func_wrapper
    return require_permission_decorator
