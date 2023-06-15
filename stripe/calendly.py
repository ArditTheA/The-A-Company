import requests

# Replace 'YOUR_ACCESS_TOKEN' with the actual access token obtained through the OAuth 2.0 flow
access_token = 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjg2NzI5NTIxLCJqdGkiOiIxNjE4NDgyYi05NmNkLTRhMDktOWY5OS02OTNjZmVkNDNhOWUiLCJ1c2VyX3V1aWQiOiJkMGQxNjIyYS1lZDdmLTQxNjUtOTQ2OS1hYzQwZmUzNzAzNzgifQ.oLnTwH_woNxUGk8m48swCiTfBjfFNiL_SucP1E0lH6gwi2-EH5I9CQG-If6VplVInFOfP1UbXQeexA7jJc2cdg'

# Calendly API endpoint URL to fetch schedule events
url = 'https://api.calendly.com/scheduled_events'

# Set the Authorization header with the access token
headers = {
    'Authorization': f'Bearer {access_token}'
}

# Set query parameters to fetch all events, including past and upcoming
params = {
    'count': 100,  # Number of events per page
    'page_token': None  # Start with the first page
}

all_events = []

while True:
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        events = response.json()['collection']
        all_events.extend(events)
        if 'pagination' in response.json() and 'next_page' in response.json()['pagination']:
            params['page_token'] = response.json()['pagination']['next_page']
        else:
            break
    else:
        print(f'Request failed with status code {response.status_code}: {response.text}')
        break

# Process each event
for event in all_events:
    event_title = event['event_type']['name']
    start_time = event['start_time']
    end_time = event['end_time']
    # Extract other necessary event details as needed

    # Do something with the event information (e.g., print it)
    print(f'Title: {event_title}')
    print(f'Start Time: {start_time}')
    print(f'End Time: {end_time}')
    print('---')
