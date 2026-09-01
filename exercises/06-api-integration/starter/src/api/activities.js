const BASE_URL = 'http://localhost:8000'

// Bug 1: wrong path — should be /activities not /activity
export async function fetchActivities() {
  const response = await fetch(`${BASE_URL}/activity`)
  return response.json()   // Bug 2: missing error check — what if the server returns 404 or 500?
}

// Bug 3: email is not passed to the server
// The backend expects ?email=... as a query parameter
export async function signupForActivity(activityName, email) {
  const response = await fetch(
    `${BASE_URL}/activities/${encodeURIComponent(activityName)}/signup`,
    { method: 'POST' }
    // Bug 3: the email query param is missing here
  )
  if (!response.ok) {
    throw new Error('Signup failed')
  }
  return response.json()
}
