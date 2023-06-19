import json

import requests
from datetime import datetime


access_token = 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjg2NzUzNzY2LCJqdGkiOiJmYTY2ZmY0Zi05ZTE2LTRjYzgtODU4My0xZTE0MDMzODlkODMiLCJ1c2VyX3V1aWQiOiJhNDZlMjk4Ni0wMGI3LTRkMGYtOTNkOS0yZGNhZGFhM2FmYTQifQ.BsBybdStVNGLNvKIroTfVcEhjImmQCvNMxvnzLBltS52NTE6YdbtjVSQmLYwkfPKIqO0MO52Y7GuWSgWFif7NA'
organization_id = "https://api.calendly.com/organizations/d380dd99-d4bf-448c-95d7-230f5c0d8ab3"


start_time = datetime.now().isoformat()

headers = {
    "Authorization": f"Bearer {access_token}",
    "Content-Type": "application/json"
}

params = {
    "min_start_time": start_time,
    "organization": organization_id
}

url = "https://api.calendly.com/scheduled_events"

response = requests.get(url, headers=headers, params=params)
def get_invitees(api_token, event_id):
    headers = {
        'Authorization': f'Bearer {api_token}',
        'Content-Type': 'application/json'
    }

    url = f'https://api.calendly.com/scheduled_events/{event_id}/invitees'

    response = requests.get(url, headers=headers)

    if response.status_code == 200:  # Successful response
        data = response.json()

        if 'collection' in data:
            invitees = data['collection']
            return invitees
        else:
            print("No invitees found in the response.")
    else:
        print("Failed to retrieve invitees. Status code:", response.status_code)



if response.status_code == 200:
    upcoming_events = response.json()
    for event in upcoming_events["collection"]:
        event_uri = event.get("uri")
        join_url = event.get("location", {}).get("join_url")
        event_start_time = event["start_time"]


        last_part = event_uri.split("/")[-1]
        
        parsed_date = datetime.strptime(event_start_time, "%Y-%m-%dT%H:%M:%S.%fZ")
        formatted_date = parsed_date.strftime("%d-%m-%Y %H:%M")
        invitees_list = get_invitees(access_token, last_part)
        if invitees_list:
            for invitee in invitees_list:
                print("----------")
                print("----------")
                name = invitee['name']
                email = invitee['email']
                print("Name:", name)
                print("Email:", email)
                print(f"Google meet url: {join_url}")
                print(f"Start Time: {formatted_date}")
                if join_url != None:
                    print("")


else:
    print("Error occurred while fetching events.")
    print(response.text)






