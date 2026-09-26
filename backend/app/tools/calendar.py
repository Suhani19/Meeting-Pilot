from datetime import datetime, timezone
from typing import Optional

from pydantic import BaseModel

from app.tools.swytchcode import execute_swytchcode


class MeetingParticipant(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None


class Meeting(BaseModel):
    id: str
    title: str
    start_time: str
    end_time: str

    description: Optional[str] = None
    location: Optional[str] = None
    meeting_link: Optional[str] = None
    organizer: Optional[str] = None

    participants: list[MeetingParticipant] = []


def normalize_calendar_event(
    event: dict
) -> Meeting:

    start = event.get("start", {})
    end = event.get("end", {})

    meeting_link = event.get(
        "hangoutLink"
    )

    if not meeting_link:
        conference_data = event.get(
            "conferenceData",
            {}
        )

        for entry in conference_data.get(
            "entryPoints",
            []
        ):
            if (
                entry.get("entryPointType")
                == "video"
            ):
                meeting_link = entry.get("uri")
                break

    organizer = event.get(
        "organizer",
        {}
    )

    organizer_value = (
        organizer.get("displayName")
        or organizer.get("email")
    )

    participants = []

    for attendee in event.get(
        "attendees",
        []
    ):
        participants.append(
            MeetingParticipant(
                name=attendee.get(
                    "displayName"
                ),
                email=attendee.get(
                    "email"
                ),
            )
        )

    return Meeting(
        id=event.get("id", ""),

        title=event.get(
            "summary",
            "Untitled meeting"
        ),

        start_time=(
            start.get("dateTime")
            or start.get("date")
            or ""
        ),

        end_time=(
            end.get("dateTime")
            or end.get("date")
            or ""
        ),

        description=event.get(
            "description"
        ),

        location=event.get(
            "location"
        ),

        meeting_link=meeting_link,

        organizer=organizer_value,

        participants=participants,
    )


def get_upcoming_meetings(
    max_results: int = 10
) -> list[Meeting]:

    now = datetime.now(
        timezone.utc
    ).isoformat()

    response = execute_swytchcode(
        canonical_id=(
            "calendar.event.get"
        ),

        inputs={
            "calendarId": "primary",
        },

        params={
            "timeMin": now,
            "singleEvents": "true",
            "orderBy": "startTime",
            "maxResults": str(
                max_results
            ),
        },
    )

    items = (
        response
        .get("data", {})
        .get("items", [])
    )

    return [
        normalize_calendar_event(event)
        for event in items
    ]


def get_next_meeting() -> Meeting | None:
    meetings = get_upcoming_meetings(
        max_results=10
    )

    if not meetings:
        return None

    return meetings[0]