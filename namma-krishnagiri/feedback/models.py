from django.db import models


class Issue(models.Model):
    CATEGORY_CHOICES = [
        ('Road', 'Road'),
        ('Water', 'Water'),
        ('Bus', 'Bus'),
        ('Hospital', 'Hospital'),
        ('Jobs', 'Jobs'),
        ('Education', 'Education'),
        ('Other', 'Other'),
    ]

    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    village = models.CharField(max_length=100)

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES
    )

    problem = models.TextField()

    solution = models.TextField(
        blank=True,
        null=True
    )

    image = models.ImageField(
        upload_to='issues/',
        blank=True,
        null=True
    )

    votes = models.IntegerField(default=0)

    status = models.CharField(
        max_length=20,
        default='Pending'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.problem[:50]


class Comment(models.Model):
    issue = models.ForeignKey(
        Issue,
        on_delete=models.CASCADE,
        related_name='comments'
    )

    name = models.CharField(max_length=100)

    comment = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name