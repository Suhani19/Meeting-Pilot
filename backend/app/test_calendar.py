from app.tools.calendar import (
    get_upcoming_meetings,
)


def main():
    meetings = get_upcoming_meetings(
        max_results=5
    )

    print("\nUpcoming meetings:\n")

    for meeting in meetings:
        print(
            meeting.model_dump_json(
                indent=2
            )
        )


if __name__ == "__main__":
    main()