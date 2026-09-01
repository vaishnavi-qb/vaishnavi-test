## Step 5: useEffect & Data Fetching 🌐

Your components now handle user input. It's time to connect them to real data from a server.

---

### 📖 Theory: useEffect and the Dependency Array

`useEffect` runs code *after* React renders — things like fetching data, setting up a timer, or updating the document title.

```jsx
// ❌ No dependency array — runs after EVERY render (infinite loop!)
useEffect(() => { fetch(...).then(setData) })

// ✅ Empty array — runs ONCE after the first render
useEffect(() => { fetch(...).then(setData) }, [])

// Runs when userId changes
useEffect(() => { ... }, [userId])
```

**The infinite loop trap:**
`useEffect` calls `setActivities` → triggers re-render → `useEffect` runs again → calls `setActivities` → ... → infinite loop.

**Async inside useEffect** — you cannot make the callback itself `async`. Instead, define an async function *inside* and call it:

```jsx
useEffect(() => {
  async function load() {
    const res = await fetch('/activities')
    const data = await res.json()
    setActivities(data)
  }
  load()
}, [])
```

> **Note:** Start the Python backend before running this exercise:
> ```bash
> # From the repo root
> pip install -r requirements.txt
> uvicorn src.app:app --reload --port 8000
> ```

---

### 🐛 The Problems (2 bugs across 2 files)

**`exercises/05-useeffect-fetch/starter/src/App.jsx`**:
```jsx
useEffect(() => {
  fetch('/activities')
    .then((res) => res.json())
    .then((data) => setActivities(data))
})           // Bug 1: missing [] — causes infinite loop
```

**`exercises/05-useeffect-fetch/starter/src/hooks/useActivities.js`**:
```jsx
useEffect(async () => {   // Bug 2: async callback — React ignores the returned Promise
  const res = await fetch('/activities')
  ...
}, [])
```

---

### 🤖 Prompt Guide

> **Prompt 1:**
> ```
> My React app keeps making fetch requests in a loop — I can see hundreds of network
> requests in browser DevTools. My useEffect looks like this: [paste]. What causes
> this and how do I fix it?
> ```

> **Prompt 2:**
> ```
> What is the dependency array in React's useEffect? What happens if I omit it,
> pass [], or pass [someVariable]? Give a concrete example of each behaviour.
> ```

> **Prompt 3:**
> ```
> I want to use async/await inside useEffect. I wrote `useEffect(async () => {...}, [])`.
> React shows a warning. Why is that wrong and what is the correct pattern?
> ```

---

### ⌨️ Activity: Fix the infinite loop

1. Fix `App.jsx` — add the empty dependency array `[]` to stop the infinite loop.
2. Fix `useActivities.js` — replace the async callback with the inner-async pattern.
3. Add a loading state to `App.jsx`:
   ```jsx
   if (loading) return <p>Loading activities…</p>
   ```
4. Open browser DevTools → **Network** tab. Confirm only **one** request to `/activities` is made on page load.

---

### ✅ Commit to continue

```bash
git add exercises/05-useeffect-fetch/starter/
git commit -m "fix: add useEffect dependency array and fix async pattern"
git push
```

<details>
<summary>Having trouble? 🤷</summary>

- The fix for Bug 1 is just adding `, []` before the closing `)` of `useEffect(...)`.
- For Bug 2: remove `async` from the callback, define `async function load() {...}` *inside* the callback, then call `load()`.
- Make sure the Python backend is running on port 8000 before testing.

</details>
