# Exercise 06: API Integration

## What You'll Learn
- How to structure API calls in a dedicated module
- How to handle HTTP errors from a `fetch` response
- How to show loading and error states in the UI
- How to connect the signup form to a real backend endpoint

---

## Core Concept: Talking to a Backend

`fetch` only throws a network error (e.g. server is down). A 404 or 500 response
does NOT throw — you have to check `response.ok` yourself:

```js
const res = await fetch('/activities')
if (!res.ok) {
  throw new Error(`Server error: ${res.status}`)
}
const data = await res.json()
```

Keeping all API calls in one file (`src/api/activities.js`) makes them easy to
find, change, and mock in tests.

---

## Starter Code — Spot the Problems

Open `starter/src/api/activities.js`:

```js
const BASE_URL = 'http://localhost:8000'

// Bug 1 — wrong endpoint path (/activity vs /activities)
export async function fetchActivities() {
  const response = await fetch(`${BASE_URL}/activity`)
  return response.json()   // Bug 2 — no error checking
}

// Bug 3 — email not included in the request
export async function signupForActivity(activityName, email) {
  const response = await fetch(
    `${BASE_URL}/activities/${encodeURIComponent(activityName)}/signup`,
    { method: 'POST' }     // Bug 3: email must be a query param
  )
  if (!response.ok) {
    throw new Error('Signup failed')
  }
  return response.json()
}
```

Open `starter/src/components/ActivityList.jsx`:

```jsx
import { useState, useEffect } from 'react'
import { fetchActivities } from '../api/activities'

function ActivityList() {
  const [activities, setActivities] = useState([])
  // Bug 4 — no loading state
  // Bug 5 — no error state

  useEffect(() => {
    fetchActivities().then(setActivities)
    // Bug 5: if fetch fails, error is swallowed silently
  }, [])

  return (
    <ul>
      {Object.entries(activities).map(([name, details]) => (
        <li key={name}>
          <strong>{name}</strong> — {details.description}
          <span> ({details.participants.length}/{details.max_participants} spots)</span>
        </li>
      ))}
    </ul>
  )
}

export default ActivityList
```

---

## Debug It With AI

> **Prompt 1 — Wrong endpoint:**
> ```
> My React app is fetching from `/activity` but the server returns a 404.
> The correct endpoint is `/activities`. How do I find and fix this kind of
> typo efficiently? What tools can help me inspect the actual HTTP requests?
> ```

> **Prompt 2 — Silent errors:**
> ```
> My data fetch silently fails — the page just shows nothing, no error message.
> Here is my useEffect: [paste]. How do I catch errors from fetch and display
> them to the user instead of swallowing them?
> ```

> **Prompt 3 — POST with query parameters:**
> ```
> My backend expects a POST to /activities/{name}/signup?email={email}.
> My fetch call is: [paste signupForActivity]. The server returns a 422 error.
> How do I add a query parameter to a fetch POST request in JavaScript?
> ```

> **Prompt 4 — Loading state UX:**
> ```
> When my page first loads there is a flash of an empty list before data arrives.
> How do I add a loading state to my component so I can show a spinner or message
> while the fetch is in progress? Please update this component: [paste ActivityList.jsx]
> ```

---

## Your Tasks

1. Fix `activities.js`:
   - Correct the endpoint path in `fetchActivities`
   - Add `?email=${encodeURIComponent(email)}` to `signupForActivity`
2. Fix `ActivityList.jsx`:
   - Add `loading` and `error` state variables
   - Show `<p>Loading...</p>` while fetching
   - Show `<p>Error: {error}</p>` if the fetch fails
   - Wrap the `fetchActivities` call in a try/catch
3. Test the signup flow: sign up for an activity and refresh — the participant
   should appear (the backend stores data in memory).
4. Test error handling: temporarily break the URL to `/wrong-path` and confirm
   the error message appears in the UI rather than failing silently.

---

## How to Know It's Working

- The activity list loads successfully with real data
- A "Loading..." message appears briefly before the list
- Breaking the URL shows an error message in the UI (not just the console)
- Signing up adds the email to the participants list (check the backend response)

---

<details>
<summary>Solution (try to solve it first!)</summary>

**activities.js** — fixed:

```js
const BASE_URL = 'http://localhost:8000'

export async function fetchActivities() {
  const response = await fetch(`${BASE_URL}/activities`)   // Fix 1
  if (!response.ok) {                                       // Fix 2
    throw new Error(`Failed to load activities: ${response.status}`)
  }
  return response.json()
}

export async function signupForActivity(activityName, email) {
  const url = `${BASE_URL}/activities/${encodeURIComponent(activityName)}/signup`
              + `?email=${encodeURIComponent(email)}`       // Fix 3
  const response = await fetch(url, { method: 'POST' })
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.detail ?? 'Signup failed')
  }
  return response.json()
}
```

**ActivityList.jsx** — fixed:

```jsx
import { useState, useEffect } from 'react'
import { fetchActivities } from '../api/activities'

function ActivityList() {
  const [activities, setActivities] = useState({})
  const [loading, setLoading] = useState(true)       // Fix 4
  const [error, setError] = useState(null)           // Fix 5

  useEffect(() => {
    fetchActivities()
      .then((data) => {
        setActivities(data)
        setLoading(false)
      })
      .catch((err) => {                              // Fix 5
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="error">Error: {error}</p>

  return (
    <ul>
      {Object.entries(activities).map(([name, details]) => (
        <li key={name}>
          <strong>{name}</strong> — {details.description}
          <span> ({details.participants.length}/{details.max_participants} spots)</span>
        </li>
      ))}
    </ul>
  )
}

export default ActivityList
```

</details>

---

## Key Takeaways

- `fetch` does not throw on HTTP error status codes — always check `response.ok`
- Keep API calls in a dedicated module; components stay focused on rendering
- Three UI states for async data: **loading**, **error**, **success**
- Query parameters in a POST request are appended to the URL string: `?email=...`
