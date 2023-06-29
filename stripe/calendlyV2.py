import json

import requests
from datetime import datetime


access_token = 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjg2NzM2OTExLCJqdGkiOiJlNzM5YTM5NC1iNzE4LTRhN2QtYTNhMS02ZWUyMjVmNmU4OTEiLCJ1c2VyX3V1aWQiOiJkMGQxNjIyYS1lZDdmLTQxNjUtOTQ2OS1hYzQwZmUzNzAzNzgifQ.NYLAShAIGTfk2NCZBGD-n8Yh4j0AhHq1wr5pKdRfRRarf-AFh5tCX45AbLwg6FvTEg6vEk-wFA2pCkHugSwI2Q'
organization_id = "https://api.calendly.com/organizations/20b4e8ad-dbc3-4063-ae8d-e3a71219d111"


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


event_type_filter = "TestAPI"
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






