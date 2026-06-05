from rest_framework import serializers
from .models import Issue, Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


class IssueSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Issue
        fields = "__all__"