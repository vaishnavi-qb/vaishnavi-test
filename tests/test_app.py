from copy import deepcopy

import pytest
from fastapi.testclient import TestClient

from src.app import activities, app


@pytest.fixture(autouse=True)
def reset_activities():
    original_state = deepcopy(activities)
    yield
    activities.clear()
    activities.update(deepcopy(original_state))


@pytest.fixture()
def client():
    return TestClient(app)


def test_get_activities_returns_activity_catalog(client):
    # Arrange
    expected_activity = "Chess Club"

    # Act
    response = client.get("/activities")

    # Assert
    assert response.status_code == 200
    payload = response.json()
    assert expected_activity in payload
    assert payload[expected_activity]["participants"]


def test_signup_adds_participant_and_prevents_duplicates(client):
    # Arrange
    email = "newstudent@mergington.edu"
    activity_name = "Chess Club"

    # Act: first signup
    first_response = client.post(
        f"/activities/{activity_name}/signup",
        params={"email": email},
    )

    # Assert: first signup succeeds
    assert first_response.status_code == 200
    assert first_response.json()["message"] == f"Signed up {email} for {activity_name}"
    assert email in activities[activity_name]["participants"]

    # Act: duplicate signup
    duplicate_response = client.post(
        f"/activities/{activity_name}/signup",
        params={"email": email},
    )

    # Assert: duplicate is rejected
    assert duplicate_response.status_code == 400
    assert duplicate_response.json()["detail"] == "Student already signed up for this activity"
