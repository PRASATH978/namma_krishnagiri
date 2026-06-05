from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Issue, Comment
from .serializers import (
    IssueSerializer,
    CommentSerializer
)


@api_view(['GET'])
def home(request):
    return Response({
        "message": "Namma Krishnagiri API Working"
    })


@api_view(['GET'])
def get_issues(request):
    issues = Issue.objects.all().order_by('-created_at')

    serializer = IssueSerializer(
        issues,
        many=True
    )

    return Response(serializer.data)


@api_view(['POST'])
def create_issue(request):

    serializer = IssueSerializer(
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()

        return Response({
            "message": "Issue submitted successfully"
        })

    return Response(serializer.errors)


@api_view(['POST'])
def vote_issue(request, issue_id):

    try:
        issue = Issue.objects.get(id=issue_id)

        issue.votes += 1

        issue.save()

        return Response({
            "message": "Vote Added",
            "votes": issue.votes
        })

    except Issue.DoesNotExist:
        return Response({
            "error": "Issue not found"
        })


@api_view(['POST'])
def add_comment(request):

    serializer = CommentSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response({
            "success": True,
            "message": "Comment Added"
        })

    return Response(serializer.errors)

@api_view(['GET'])
def dashboard(request):

    total_issues = Issue.objects.count()

    total_votes = sum(
        issue.votes
        for issue in Issue.objects.all()
    )

    total_comments = Comment.objects.count()

    return Response({
        "total_issues": total_issues,
        "total_votes": total_votes,
        "total_comments": total_comments
    })


@api_view(['GET'])
def get_comments(request, issue_id):

    comments = Comment.objects.filter(
        issue_id=issue_id
    ).order_by('-created_at')

    serializer = CommentSerializer(
        comments,
        many=True
    )

    return Response(serializer.data)