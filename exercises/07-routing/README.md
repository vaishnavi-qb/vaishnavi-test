# Exercise 07: Client-Side Routing

## What You'll Learn
- What client-side routing is and why it feels faster than server-side navigation
- How to set up React Router v6
- How `<Link>` differs from `<a href>` (and why you must use `<Link>`)
- How to define routes and read URL parameters with `useParams`

---

## Core Concept: Client-Side Routing

In a traditional multi-page site, clicking a link makes the **browser request a new HTML
page from the server** — the whole page reloads, scroll position resets, and state is lost.

In a React SPA, React Router **intercepts link clicks**, updates the URL in the browser
bar, and swaps in the right component — all without a server round-trip. The page never
truly reloads.

**Key pieces of React Router v6:**

| Component / Hook | Purpose |
|---|---|
| `<BrowserRouter>` | Wrap your whole app once; provides routing context |
| `<Routes>` | Container that holds your route definitions |
| `<Route path="..." element={...}>` | Maps a URL pattern to a component |
| `<Link to="...">` | Navigates without page reload (replaces `<a href>`) |
| `useParams()` | Reads dynamic URL segments like `:activityName` |
| `useNavigate()` | Programmatic navigation (e.g. redirect after signup) |

---

## Starter Code — Spot the Problems

Open `starter/src/main.jsx`:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Bug 1 — BrowserRouter not imported or used
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />       {/* needs to be wrapped in <BrowserRouter> */}
  </StrictMode>
)
```

Open `starter/src/App.jsx`:

```jsx
// Bug 2 — Routes and Route not used; just hard-coding one page
import HomePage from './pages/HomePage'
import ActivityDetailPage from './pages/ActivityDetailPage'

function App() {
  return (
    <div>
      <nav>
        <a href="/">Home</a>               {/* Bug 3 — <a> causes full reload */}
        <a href="/activities">Activities</a>
      </nav>
      <HomePage />     {/* Bug 4 — always renders HomePage, ignores the URL */}
    </div>
  )
}

export default App
```

Open `starter/src/pages/ActivityDetailPage.jsx`:

```jsx
// Bug 5 — doesn't read the activity name from the URL
function ActivityDetailPage() {
  const activityName = 'Chess Club'   // Bug 5: hardcoded, should come from URL

  return (
    <div>
      <h1>{activityName}</h1>
      <p>Detail page for this activity.</p>
    </div>
  )
}

export default ActivityDetailPage
```

---

## Debug It With AI

> **Prompt 1 — Why does the page reload?:**
> ```
> My React app uses <a href="/activities"> for navigation but every click causes
> the full page to reload and I lose all React state. I'm using React Router.
> What should I use instead of <a href> and why?
> ```

> **Prompt 2 — Setting up BrowserRouter:**
> ```
> I have a React app with multiple pages. I installed react-router-dom but
> nothing works — when I change the URL, the same component always shows.
> How do I set up React Router v6 from scratch? What goes in main.jsx vs App.jsx?
> ```

> **Prompt 3 — Dynamic routes:**
> ```
> I want a route /activities/:activityName where activityName comes from the URL.
> How do I define this route in React Router v6, and how does the page component
> read the activityName value?
> ```

> **Prompt 4 — Fix everything:**
> ```
> Please fix these three files so React Router v6 works correctly.
> Requirements:
> - "/" shows HomePage
> - "/activities/:activityName" shows ActivityDetailPage
> - Navigating between pages does NOT cause a full page reload
> - ActivityDetailPage reads the name from the URL
> [paste main.jsx, App.jsx, ActivityDetailPage.jsx]
> ```

---

## Your Tasks

1. Install React Router: `npm install react-router-dom`
2. Fix `main.jsx` — wrap `<App>` with `<BrowserRouter>`.
3. Fix `App.jsx`:
   - Import `Routes`, `Route`, and `Link` from `react-router-dom`
   - Replace `<a href>` with `<Link to>`
   - Add `<Routes>` with two `<Route>` definitions:
     - `path="/"` → `<HomePage />`
     - `path="/activities/:activityName"` → `<ActivityDetailPage />`
4. Fix `ActivityDetailPage.jsx` — use `useParams()` to read `:activityName` from the URL.
5. Update `ActivityList` (from exercise 04/06) so each activity name links to its detail page:
   ```jsx
   <Link to={`/activities/${encodeURIComponent(activity.name)}`}>
     {activity.name}
   </Link>
   ```
6. Navigate between pages and confirm the URL changes but the page **never fully reloads**
   (check: the browser tab title doesn't flash, and React DevTools Components panel
   keeps state between navigations).

---

## How to Know It's Working

- Clicking a `<Link>` updates the URL bar without a full page reload
- `/` shows the activity list; `/activities/Chess%20Club` shows the detail page
- `ActivityDetailPage` shows the actual activity name from the URL, not "Chess Club" hardcoded
- Pressing the browser Back button navigates correctly

---

<details>
<summary>Solution (try to solve it first!)</summary>

**main.jsx** — fixed:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'   // Fix 1
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>    {/* Fix 1 */}
      <App />
    </BrowserRouter>
  </StrictMode>
)
```

**App.jsx** — fixed:

```jsx
import { Routes, Route, Link } from 'react-router-dom'   // Fix 2
import HomePage from './pages/HomePage'
import ActivityDetailPage from './pages/ActivityDetailPage'

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>                        {/* Fix 3 */}
        <Link to="/activities">Activities</Link>
      </nav>
      <Routes>                                          {/* Fix 4 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/activities/:activityName" element={<ActivityDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
```

**ActivityDetailPage.jsx** — fixed:

```jsx
import { useParams } from 'react-router-dom'     // Fix 5

function ActivityDetailPage() {
  const { activityName } = useParams()           // Fix 5: read from URL

  return (
    <div>
      <h1>{decodeURIComponent(activityName)}</h1>
      <p>Detail page for this activity.</p>
    </div>
  )
}

export default ActivityDetailPage
```

</details>

---

## Key Takeaways

- Wrap your app in `<BrowserRouter>` once in `main.jsx` — everything inside gets routing context
- Always use `<Link to="...">` instead of `<a href="...">` to stay within the SPA
- `<Routes>` matches the current URL and renders the first `<Route>` that fits
- `useParams()` gives you the dynamic segments from the URL (e.g. `:activityName`)
- Encode/decode special characters in URLs with `encodeURIComponent` / `decodeURIComponent`
