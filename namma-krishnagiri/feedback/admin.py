from django.contrib import admin
from .models import Issue, Comment


@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'category',
        'village',
        'votes',
        'status',
        'created_at'
    )

    list_filter = (
        'category',
        'status'
    )

    search_fields = (
        'name',
        'village',
        'problem'
    )


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'issue',
        'created_at'
    )