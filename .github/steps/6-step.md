## Step 6: API Integration 🔌

You can fetch data. Now let's make that code production-quality: correct endpoints, proper error handling, and loading states.

---

### 📖 Theory: Talking to a Backend

`fetch` only throws on a *network* error (e.g. server is down). A `404` or `500` response does **not** throw — you must check `response.ok` yourself:

```js
const res = await fetch('/activities')
if (!res.ok) {
  throw new Error(`Server error: ${res.status}`)
}
const data = await res.json()
```

Keep all API calls in one file (`src/api/activities.js`). Components stay focused on rendering; the API module handles HTTP.

Three states for any async data:
1. **Loading** — show a spinner or message
2. **Error** — show the error message in the UI (not just the console)
3. **Success** — render the data

---

### 🐛 The Problems (5 bugs across 2 files)

**`exercises/06-api-integration/starter/src/api/activities.js`**:
```js
// Bug 1: wrong path (/activity vs /activities)
const response = await fetch(`${BASE_URL}/activity`)
return response.json()         // Bug 2: no response.ok check

// Bug 3: email not sent to server
const response = await fetch(
  `${BASE_URL}/activities/${name}/signup`,
  { method: 'POST' }           // missing ?email=...
)
```

**`exercises/06-api-integration/starter/src/components/ActivityList.jsx`**:
```jsx
useEffect(() => {
  fetchActivities().then((data) => setActivities(data))
  // Bug 4: no loading state
  // Bug 5: no error handling — failures are swallowed silently
}, [])
```

---

### 🤖 Prompt Guide

> **Prompt 1:**
> ```
> My React app fetches from `/activity` but the server returns a 404.
> The correct endpoint is `/activities`. How do I find and fix this kind of typo?
> What browser tool shows me the actual HTTP requests being made?
> ```

> **Prompt 2:**
> ```
> My data fetch fails silently — the page just shows nothing, no error message.
> Here is my useEffect: [paste]. How do I catch errors from fetch and show
> them to the user?
> ```

> **Prompt 3:**
> ```
> My backend expects POST /activities/{name}/signup?email={email}.
> My fetch call is: [paste]. The server returns 422. How do I add a
> query parameter to a fetch POST request?
> ```

---

### ⌨️ Activity: Fix the API module

1. Fix `activities.js` — 3 bugs:
   - Correct the endpoint path
   - Add `if (!response.ok) throw new Error(...)` after each fetch
   - Add `?email=${encodeURIComponent(email)}` to the signup URL
2. Fix `ActivityList.jsx` — 2 bugs:
   - Add `loading` and `error` state variables
   - Wrap `fetchActivities()` in a try/catch and set the error state on failure
   - Show `<p>Loading…</p>` while fetching and `<p>Error: {error}</p>` on failure
3. Test error handling: temporarily change `/activities` to `/wrong-path` — confirm the error message appears in the UI (not just the console). Then revert.

---

### ✅ Commit to continue

```bash
git add exercises/06-api-integration/starter/
git commit -m "fix: correct endpoint, add error handling and loading state"
git push
```

<details>
<summary>Having trouble? 🤷</summary>

- The endpoint fix is one character: `/activity` → `/activities`.
- `response.ok` is a boolean — `if (!response.ok) throw new Error(...)` is the standard pattern.
- Query params go in the URL string: append `?email=${encodeURIComponent(email)}` to the signup URL.

</details>
