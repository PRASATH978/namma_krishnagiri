from django.urls import path
from .views import get_comments

from .views import (
    get_comments,
    home,
    get_issues,
    create_issue,
    vote_issue,
    add_comment,
    dashboard
)

urlpatterns = [
    path('', home),

    path(
        'issues/',
        get_issues
    ),

    path(
        'issues/create/',
        create_issue
    ),

    path(
        'vote/<int:issue_id>/',
        vote_issue
    ),

    path(
        'comment/',
        add_comment
    ),

    path(
        'dashboard/',
        dashboard
    ),

    path(
    'comments/<int:issue_id>/',
    get_comments
),
]