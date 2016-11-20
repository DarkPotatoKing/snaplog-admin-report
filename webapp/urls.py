from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^login$', views.index, name='index'),
    url(r'student/$', views.student, name='student'),
    url(r'visitor/$', views.visitor, name='visitor'),
    url(r'report/$', views.report, name='report'),
]