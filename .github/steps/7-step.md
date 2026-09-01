## Step 7: Client-Side Routing 🗺️

The final step! Your app currently shows everything on one page. Let's add navigation so users can move between pages without a full browser reload.

---

### 📖 Theory: Client-Side Routing

In a traditional site, clicking a link makes the **browser request a new HTML page from the server** — the whole page reloads and React state is lost.

With React Router, link clicks are **intercepted by JavaScript**. The URL updates in the browser bar, the right component swaps in — but the page never truly reloads. This is what makes it a "Single Page Application".

**Key pieces of React Router v6:**

| Component / Hook | Purpose |
|---|---|
| `<BrowserRouter>` | Wrap your whole app once — provides routing context |
| `<Routes>` | Container that matches the current URL to a route |
| `<Route path="..." element={...}>` | Maps a URL pattern to a component |
| `<Link to="...">` | Navigates without reload (replaces `<a href>`) |
| `useParams()` | Reads dynamic URL segments like `:activityName` |

---

### 🐛 The Problems (5 bugs across 3 files)

**`exercises/07-routing/starter/src/main.jsx`**:
```jsx
// Bug 1: BrowserRouter not imported or used
createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>  // needs <BrowserRouter> wrapper
)
```

**`exercises/07-routing/starter/src/App.jsx`**:
```jsx
// Bug 2: Routes/Route not used — same page always renders
// Bug 3: <a href> causes full page reload
<a href="/">Home</a>
<a href="/activities/Chess%20Club">Chess Club</a>
<HomePage />  // always renders regardless of URL
```

**`exercises/07-routing/starter/src/pages/ActivityDetailPage.jsx`**:
```jsx
// Bug 4 & 5: activity name hardcoded instead of reading from URL
const activityName = 'Chess Club'  // should use useParams()
```

---

### 🤖 Prompt Guide

> **Prompt 1:**
> ```
> My React app uses <a href="/activities"> but every click causes a full page
> reload and I lose state. I'm using React Router. What should I use instead
> of <a href> and why?
> ```

> **Prompt 2:**
> ```
> How do I set up React Router v6 from scratch? My app needs:
> - "/" shows HomePage
> - "/activities/:activityName" shows ActivityDetailPage
> What goes in main.jsx vs App.jsx?
> ```

> **Prompt 3:**
> ```
> I want ActivityDetailPage to read the activity name from the URL
> (e.g. /activities/Chess%20Club). How do I do that with React Router v6?
> [paste ActivityDetailPage.jsx]
> ```

---

### ⌨️ Activity: Add client-side routing

1. Run `npm install react-router-dom` from `exercises/07-routing/starter/`.
2. Fix `main.jsx` — wrap `<App>` with `<BrowserRouter>`.
3. Fix `App.jsx`:
   - Replace `<a href>` with `<Link to>`.
   - Add `<Routes>` with two `<Route>` definitions.
4. Fix `ActivityDetailPage.jsx` — use `useParams()` to read `:activityName`.
5. Test: navigate between pages and confirm the URL changes but the **browser tab title never flashes** (no full reload). Press Back — it works correctly.

---

### ✅ Commit to continue

```bash
git add exercises/07-routing/starter/
git commit -m "fix: add BrowserRouter, Link, Routes, and useParams"
git push
```

<details>
<summary>Having trouble? 🤷</summary>

- Install `react-router-dom` first — it's not in this starter's `package.json` yet.
- `BrowserRouter` wraps `<App />` in `main.jsx`, not inside `App.jsx`.
- Every `<a href="...">` inside the app must become `<Link to="...">`.
- `useParams()` returns an object — destructure it: `const { activityName } = useParams()`.

</details>
