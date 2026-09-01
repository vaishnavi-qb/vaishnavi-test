const BASE_URL = 'http://localhost:8000'

export async function fetchActivities() {
  const response = await fetch(`${BASE_URL}/activities`)
  if (!response.ok) {
    throw new Error(`Failed to load activities: ${response.status}`)
  }
  return response.json()
}

export async function signupForActivity(activityName, email) {
  const url =
    `${BASE_URL}/activities/${encodeURIComponent(activityName)}/signup` +
    `?email=${encodeURIComponent(email)}`
  const response = await fetch(url, { method: 'POST' })
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.detail ?? 'Signup failed')
  }
  return response.json()
}
