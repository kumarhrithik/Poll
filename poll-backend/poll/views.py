from rest_framework import generics
from .models import Poll
from .serializers import PollSerializer
from .tasks import send_email_task
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.utils import timezone

class PollList(generics.ListCreateAPIView):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer

class PollDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        # Check if the poll is closed based on the end_date
        if instance.end_date and timezone.now() > instance.end_date:
            print("Poll is closed")
            # Send email notification asynchronously
            if instance.email:
                subject = "Polling Completed"
                message = f"Thank you for participating in the poll '{instance.question}'. Your vote has been recorded."
                recipient_list = [instance.email]
                send_email_task.delay(subject, message, recipient_list)

        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
@api_view(['POST'])
def vote_view(request, pk):
    poll = get_object_or_404(Poll, pk=pk)

    # Check if the poll is closed based on the end_date
    if poll.end_date and timezone.now() > poll.end_date:
        return Response({'error': 'The poll is closed'}, status=400)

    selected_option = request.data.get('selectedOption', '')
    email = request.data.get('email', '')
    if email:
        existing_emails = poll.recipient_emails.split(',') if poll.recipient_emails else []
        updated_emails = ','.join(existing_emails + [email])
        poll.recipient_emails = updated_emails
        poll.save()

    if selected_option == 'option_one':
        poll.option_one_count += 1
    elif selected_option == 'option_two':
        poll.option_two_count += 1
    elif selected_option == 'option_three':
        poll.option_three_count += 1
    else:
        return Response({'error': 'Invalid option selected'}, status=400)

    poll.save()

    return Response({'message': 'Vote submitted successfully'})
