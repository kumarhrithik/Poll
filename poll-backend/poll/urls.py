from django.urls import path
from . import views

urlpatterns = [
    path('', views.PollList.as_view(), name='poll-list'),
    path('<int:pk>/', views.PollDetail.as_view(), name='poll-detail'),
    path('<int:pk>/vote/', views.vote_view, name='vote'),
]