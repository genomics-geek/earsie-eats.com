from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from django.views import defaults as default_views
from django.views.decorators.csrf import csrf_exempt

from graphene_django.views import GraphQLView
from rest_framework.routers import DefaultRouter

from earsie_eats_blog.users.views import (
    FacebookLogin,
    GitHubLogin,
    GoogleLogin,
    InstagramLogin,
    TwitterLogin,
)


router = DefaultRouter(trailing_slash=False)


urlpatterns = [
    # React UI routes
    path("", TemplateView.as_view(template_name="index.html")),
    re_path(r'^app/(?P<route>.*)$', login_required(TemplateView.as_view(template_name="index.html")), name='app'),
    path("login/", TemplateView.as_view(template_name="index.html"), name="login"),
    path("register/", TemplateView.as_view(template_name="index.html"), name="register"),
    re_path(r'^management/(?P<route>.*)$', TemplateView.as_view(template_name="index.html"), name="management"),
    path("register/verify-email/<str:key>", TemplateView.as_view(template_name="index.html"), name="verify_email"),

    # Data endpoints
    path("api/", include(router.urls)),
    path("graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True, pretty=True))),

    # Local APP urls
    path("recipes/", include('earsie_eats_blog.recipes.urls')),

    # Django Admin, use {% url 'admin:index' %}
    path(settings.ADMIN_URL, admin.site.urls),

    # Django REST Auth
    path("auth/", include('django.contrib.auth.urls')),
    path("rest-auth/", include('rest_auth.urls')),
    path("rest-auth/registration/", include('rest_auth.registration.urls')),
    path("rest-auth/facebook/", FacebookLogin.as_view(), name='fb_login'),
    path("rest-auth/google/", GoogleLogin.as_view(), name='google_login'),
    path("rest-auth/github/", GitHubLogin.as_view(), name='github_login'),
    path("rest-auth/instagram/", InstagramLogin.as_view(), name='instagram_login'),
    path("rest-auth/twitter/", TwitterLogin.as_view(), name='twitter_login'),

    # Django all-auth URLs
    path("home/", TemplateView.as_view(template_name="pages/home.html"), name="home"),
    path(
        "about/",
        TemplateView.as_view(template_name="pages/about.html"),
        name="about",
    ),
    # User management
    path(
        "users/",
        include("earsie_eats_blog.users.urls", namespace="users"),
    ),
    path("accounts/", include("allauth.urls")),
    # Your stuff: custom urls includes go here
] + static(
    settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
)

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
