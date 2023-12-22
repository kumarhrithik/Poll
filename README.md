# Poll Project Documentation

## Overview

The Poll Project consists of two main components: the Django backend (`poll-backend`) and the React frontend (`poll-frontend`). This project allows users to create, vote, and view the results of polls.

## Django Backend (`poll-backend`)

### Project Structure

- **poll-backend/**
  - **poll/**
    - **admin.py**: Handles Django admin configurations.
    - **apps.py**: Configures the Poll app.
    - **forms.py**: Defines forms for the Poll app.
    - **models.py**: Defines the Poll model.
    - **serializers.py**: Contains serializers for the Poll model.
    - **tasks.py**: Defines Celery tasks, including an asynchronous email sending task.
    - **urls.py**: Defines URL patterns for the Poll app.
    - **views.py**: Implements views for the Poll app.

  - **poll_project/**
    - **__init__.py**
    - **asgi.py**: ASGI configuration.
    - **celery.py**: Celery configuration.
    - **settings.py**: Django project settings.
    - **urls.py**: Main URL patterns for the Django project.
    - **wsgi.py**: WSGI configuration.

  - **manage.py**: Django management script.

### Poll Model (`poll-backend/poll/models.py`)

The `Poll` model represents a poll with various attributes such as question, options, vote counts, email, and end date.

### Poll Serializer (`poll-backend/poll/serializers.py`)

The `PollSerializer` converts the Poll model into JSON format for API interactions.

### Views and URL Patterns

- **Views**: Defined in `poll-backend/poll/views.py`, including a view to list and create polls, a view to retrieve, update, and delete polls, and a custom view for voting.
- **URL Patterns**: Defined in `poll-backendt/poll/urls.py`, mapping views to URLs.

### Celery Tasks (`poll-backend/poll/tasks.py`)

The `send_email_task` is a Celery task for sending emails asynchronously.

### Django Project Settings (`poll-backend/poll_project/settings.py`)

Configuration file for Django settings, including database configuration, middleware, installed apps, and Celery settings.

## React Frontend (`poll-frontend`)

### Project Structure

- **poll-frontend/**
  - **public/**
  - **src/**
    - **components/**
      - **Create.js**: React component for creating a new poll.
      - **Home.js**: React component for listing available polls.
      - **Results.js**: React component for displaying poll results.
      - **Vote.js**: React component for voting on a poll.
    - **styles/**
      - **App.css**: Stylesheet for the React components.
    - **App.js**: Main React component handling routing.

## Running the Project

1. Ensure Django and Node.js are installed.
2. Set up and run the Django backend using `python manage.py runserver`.
3. Set up and run the React frontend using `npm start`.
4. Visit `http://localhost:3000` to interact with the Poll Project.

Feel free to refer to individual files for detailed code implementations and comments.

Note: Make sure to replace placeholder values such as email credentials, API URLs, etc., with actual values for proper functionality.
