# Exercise 05: useEffect & Data Fetching

## What You'll Learn
- How `useEffect` runs side effects after a render
- How the dependency array controls *when* the effect re-runs
- Why forgetting the dependency array causes an infinite loop
- How to write `async/await` inside a `useEffect` correctly
- How to use the native `fetch` API

---

## Core Concept: useEffect

`useEffect` lets you run code *after* React renders the component — things like
fetching data, setting up subscriptions, or updating the document title.

```jsx
// Runs after EVERY render (often a bug)
useEffect(() => { ... })

// Runs ONCE on mount (what you usually want for initial data load)
useEffect(() => { ... }, [])

// Runs when `userId` changes
useEffect(() => { ... }, [userId])
```

**The infinite loop trap:**
`useEffect` → calls `setActivities` → triggers re-render →
`useEffect` runs again → calls `setActivities` → ...

The dependency array `[]` breaks this cycle by telling React "run this only once".

**Async inside useEffect:**
`useEffect`'s callback must not be an `async` function directly (React ignores its
returned Promise). Instead, define an async function inside and call it:

```jsx
useEffect(() => {
  async function loadData() {
    const res = await fetch('/activities')
    const data = await res.json()
    setActivities(data)
  }
  loadData()
}, [])
```

---

## Starter Code — Spot the Problems

Open `starter/src/App.jsx`:

```jsx
import { useState, useEffect } from 'react'
import ActivityList from './components/ActivityList'

function App() {
  const [activities, setActivities] = useState([])

  // Bug 1 — no dependency array → infinite loop
  useEffect(() => {
    fetch('/activities')
      .then((res) => res.json())
      .then((data) => setActivities(data))
  })

  return <ActivityList activities={activities} />
}

export default App
```

Open `starter/src/hooks/useActivities.js`:

```js
import { useState, useEffect } from 'react'

// Bug 2 — async useEffect callback (bad practice, produces warning)
export function useActivities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(async () => {           // Bug 2: can't be async
    const res = await fetch('/activities')
    const data = await res.json()
    setActivities(data)
    setLoading(false)
  }, [])

  return { activities, loading }
}
```

---

## Debug It With AI

> **Prompt 1 — Diagnose the infinite loop:**
> ```
> My React app keeps making fetch requests in a loop — I can see hundreds of network
> requests in the browser DevTools Network tab. My useEffect looks like this:
> [paste the useEffect without []]. What is causing this and how do I fix it?
> ```

> **Prompt 2 — Understand the dependency array:**
> ```
> What is the dependency array in React's useEffect? What happens if I omit it,
> pass an empty array [], or pass [someVariable]?
> Can you give a concrete example of each behaviour?
> ```

> **Prompt 3 — Async inside useEffect:**
> ```
> I want to use async/await inside useEffect to fetch data. I tried making the
> callback async: `useEffect(async () => {...}, [])` but React shows a warning.
> Why is that wrong and what is the correct pattern?
> ```

> **Prompt 4 — Custom hook:**
> ```
> Fix my useActivities custom hook so it: (1) doesn't make the useEffect callback
> async, (2) fetches from '/activities', (3) returns { activities, loading }.
> [paste useActivities.js]
> ```

---

## Your Tasks

1. Fix `App.jsx` — add the missing dependency array to stop the infinite loop.
2. Fix `useActivities.js` — replace the async callback with the correct inner-async pattern.
3. Add a loading state to `App.jsx`:
   ```jsx
   if (loading) return <p>Loading activities...</p>
   ```
4. Open browser DevTools → Network tab. Confirm only **one** request to `/activities`
   is made when the page loads.

> **Note:** For exercises 05–07 you need the Python backend running.
> From the repo root: `uvicorn src.app:app --reload --port 8000`
> The Vite dev server proxies `/activities` to `http://localhost:8000` automatically
> (configured in `vite.config.js`).

---

## How to Know It's Working

- Network tab shows exactly one `GET /activities` request on page load
- The loading message appears briefly before the list renders
- No console errors about "update on unmounted component" or React warnings
- The activity list populates with real data from the backend

---

<details>
<summary>Solution (try to solve it first!)</summary>

**App.jsx** — fixed:

```jsx
import { useState, useEffect } from 'react'
import ActivityList from './components/ActivityList'

function App() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {                    // Fix 1: dependency array added
    async function loadActivities() {
      const res = await fetch('/activities')
      const data = await res.json()
      setActivities(Object.entries(data).map(([name, details]) => ({ name, ...details })))
      setLoading(false)
    }
    loadActivities()
  }, [])                               // [] = run once on mount

  if (loading) return <p>Loading activities...</p>

  return <ActivityList activities={activities} />
}

export default App
```

**useActivities.js** — fixed:

```js
import { useState, useEffect } from 'react'

export function useActivities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {                    // Fix 2: not async
    async function load() {
      const res = await fetch('/activities')
      const data = await res.json()
      setActivities(Object.entries(data).map(([name, v]) => ({ name, ...v })))
      setLoading(false)
    }
    load()
  }, [])

  return { activities, loading }
}
```

</details>

---

## Key Takeaways

- `useEffect` without `[]` runs after every render — almost always a bug when fetching data
- Empty `[]` means "run once after the first render" — correct for initial data loads
- Never make the `useEffect` callback itself `async`; define an async function inside it instead
- `Object.entries(data)` converts the API's object-of-objects into an array you can `.map()` over
