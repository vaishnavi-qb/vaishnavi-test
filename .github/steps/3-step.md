## Step 3: State & Event Handling 🖱️

Your components can display data — now let's make them *respond* to user actions.

---

### 📖 Theory: useState

In React the UI is a **reflection of state**. When state changes, React re-renders the component automatically. If you change a plain variable, React has no idea anything happened.

```jsx
// ❌ WRONG — React doesn't see this
let liked = false
function handleClick() { liked = !liked }

// ✅ CORRECT — React re-renders when setLiked is called
const [liked, setLiked] = useState(false)
function handleClick() { setLiked(!liked) }
```

`useState(initial)` returns `[currentValue, setterFunction]`. Always call the setter — never mutate directly.

Also note: React events use **camelCase** — `onClick` not `onclick`.

---

### 🐛 The Problems (4 bugs across 2 files)

**`exercises/03-state-events/starter/src/components/LikeButton.jsx`** — 3 bugs:
```jsx
let liked = false              // Bug 1: plain variable, not state
function handleClick() {
  liked = !liked               // Bug 2: direct mutation
}
<button onclick={handleClick}> // Bug 3: wrong event name
```

**`exercises/03-state-events/starter/src/components/FilterBar.jsx`** — 1 bug:
```jsx
<button
  key={filter}
  className={activeFilter === filter ? 'active' : ''}
  // Bug 4: onClick handler missing entirely
>
```

---

### 🤖 Prompt Guide

> **Prompt 1:**
> ```
> I have a React button. The console.log shows the variable changing, but the
> button text never updates on screen. Here is my code: [paste LikeButton.jsx].
> Why does this happen and how do I fix it?
> ```

> **Prompt 2:**
> ```
> My React button has `onclick={handleClick}` but doesn't respond.
> Is there a difference between `onclick` and `onClick` in React? Why?
> ```

> **Prompt 3:**
> ```
> My FilterBar buttons don't update the active style when clicked. The state
> variable exists but nothing calls setActiveFilter. How should the onClick
> handler be written so it updates state AND calls onFilterChange?
> [paste FilterBar.jsx]
> ```

---

### ⌨️ Activity: Fix state and events

1. Fix `LikeButton.jsx` — 3 bugs to resolve.
2. Fix `FilterBar.jsx` — add the missing `onClick` handler.
3. Run `npm run dev` from `exercises/03-state-events/starter/` and test:
   - Clicking **Like** changes the text to **Unlike** and back.
   - Clicking a filter button applies the `active` CSS class.
   - The message "Showing sports activities only" appears only when **sports** is active.
4. Open React DevTools — watch the `liked` state value change live as you click.

---

### ✅ Commit to continue

```bash
git add exercises/03-state-events/starter/
git commit -m "fix: use useState and add onClick handlers"
git push
```

<details>
<summary>Having trouble? 🤷</summary>

- `let liked = false` must become `const [liked, setLiked] = useState(false)` — and import `useState` from `'react'`.
- Direct assignment `liked = !liked` must become `setLiked(!liked)`.
- `onclick` → `onClick` (capital O).

</details>
