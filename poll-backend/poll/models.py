from django.db import models

class Poll(models.Model):
    question = models.TextField()
    option_one = models.CharField(max_length=30)
    option_two = models.CharField(max_length=30)
    option_three = models.CharField(max_length=30)
    option_one_count = models.IntegerField(default=0)
    option_two_count = models.IntegerField(default=0)
    option_three_count = models.IntegerField(default=0)
    email = models.EmailField(blank=True, null=True)
    recipient_emails = models.TextField(blank=True, null=True, help_text='Enter email addresses separated by commas')
    end_date = models.DateTimeField(blank=True, null=True, help_text='Poll ending date and time')

    def total(self):
        return self.option_one_count + self.option_two_count + self.option_three_count
