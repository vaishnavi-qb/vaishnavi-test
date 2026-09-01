const BASE_URL = ''  // empty = same origin; Vite proxies /activities → localhost:8000

export async function fetchActivities() {
  const res = await fetch(`${BASE_URL}/activities`)
  if (!res.ok) throw new Error(`Failed to load activities (${res.status})`)
  return res.json()
}

export async function signupForActivity(activityName, email) {
  const url =
    `${BASE_URL}/activities/${encodeURIComponent(activityName)}/signup` +
    `?email=${encodeURIComponent(email)}`
  const res = await fetch(url, { method: 'POST' })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.detail ?? `Signup failed (${res.status})`)
  }
  return res.json()
}
