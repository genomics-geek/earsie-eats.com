web: gunicorn config.wsgi:application
worker: celery worker --app=earsie_eats_blog.taskapp --loglevel=info
