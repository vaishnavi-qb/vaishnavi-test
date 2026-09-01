# Exercise 03: State & Event Handling

## What You'll Learn
- Why React needs `useState` to track changing data
- Why directly mutating a variable does NOT update the UI
- How to wire up click events with `onClick`
- How to use conditional rendering to show/hide content

---

## Core Concept: useState

In React, the UI is a **reflection of state**. When state changes, React re-renders the component. If you change a plain variable, React has no idea anything happened.

```jsx
// WRONG — React doesn't see this change
let count = 0
function handleClick() { count = count + 1 }

// CORRECT — React re-renders when setCount is called
const [count, setCount] = useState(0)
function handleClick() { setCount(count + 1) }
```

`useState(initialValue)` returns a pair: the **current value** and a **setter function**.
Calling the setter triggers a re-render with the new value.

**Conditional rendering** — show content based on state:
```jsx
{isOpen && <p>This only renders when isOpen is true</p>}
{isOpen ? <p>Open</p> : <p>Closed</p>}
```

---

## Starter Code — Spot the Problems

Open `starter/src/components/LikeButton.jsx`:

```jsx
function LikeButton() {
  let liked = false     // Bug 1 — plain variable, not state

  function handleClick() {
    liked = !liked      // Bug 2 — direct mutation, no re-render
    console.log('liked is now:', liked)
  }

  return (
    <button onclick={handleClick}>   {/* Bug 3 — wrong event name */}
      {liked ? 'Unlike' : 'Like'}
    </button>
  )
}

export default LikeButton
```

Open `starter/src/components/FilterBar.jsx`:

```jsx
import { useState } from 'react'

function FilterBar({ onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = ['all', 'sports', 'arts', 'academic']

  return (
    <div className="filter-bar">
      {filters.map((filter) => (
        <button
          key={filter}
          className={activeFilter === filter ? 'active' : ''}
          // Bug 4 — onClick handler missing entirely
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

export default FilterBar
```

---

## Debug It With AI

> **Prompt 1 — Understand why the button doesn't work:**
> ```
> I have a React component with a button that should toggle between "Like" and "Unlike"
> when clicked. The console.log shows the variable changing, but the button text never
> updates. Here is my code: [paste LikeButton.jsx]. Why does this happen?
> ```

> **Prompt 2 — Learn about useState:**
> ```
> What is React's useState hook? How is it different from a regular variable?
> Can you rewrite LikeButton.jsx using useState so the text actually changes?
> ```

> **Prompt 3 — Fix the event name:**
> ```
> My React button has `onclick={handleClick}` but it doesn't respond.
> Is there a difference between `onclick` and `onClick` in React? Why?
> ```

> **Prompt 4 — Fix the FilterBar:**
> ```
> My FilterBar component has buttons but clicking them does nothing. The
> `onFilterChange` prop exists and `setActiveFilter` is imported. 
> What onClick handler should each button have, and how should it call both
> setActiveFilter and onFilterChange?
> ```

---

## Your Tasks

1. Fix `LikeButton.jsx` so clicking the button toggles the text correctly (3 bugs to fix).
2. Fix `FilterBar.jsx` so clicking a filter button:
   - Updates the `activeFilter` state (changes the active CSS class)
   - Calls `onFilterChange(filter)` to notify the parent
3. In `App.jsx`, import both components and add this conditional rendering:
   ```jsx
   {activeFilter === 'sports' && <p>Showing sports only</p>}
   ```
4. Open React DevTools → Components tab. Click the LikeButton component and
   toggle the button — watch the state value change in real time.

---

## How to Know It's Working

- Clicking "Like" changes the button text to "Unlike" and back
- Clicking a filter button applies the `active` CSS class to that button
- The conditional message appears only when the `sports` filter is active
- React DevTools shows the `liked` and `activeFilter` state values updating live

---

<details>
<summary>Solution (try to solve it first!)</summary>

**LikeButton.jsx** — fixed:

```jsx
import { useState } from 'react'

function LikeButton() {
  const [liked, setLiked] = useState(false)   // Fix 1 & 2: useState

  function handleClick() {
    setLiked(!liked)                           // Fix 2: use setter
  }

  return (
    <button onClick={handleClick}>            {/* Fix 3: capital O */}
      {liked ? 'Unlike' : 'Like'}
    </button>
  )
}

export default LikeButton
```

**FilterBar.jsx** — fixed:

```jsx
import { useState } from 'react'

function FilterBar({ onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = ['all', 'sports', 'arts', 'academic']

  return (
    <div className="filter-bar">
      {filters.map((filter) => (
        <button
          key={filter}
          className={activeFilter === filter ? 'active' : ''}
          onClick={() => {            // Fix 4: onClick handler added
            setActiveFilter(filter)
            onFilterChange(filter)
          }}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

export default FilterBar
```

</details>

---

## Key Takeaways

- Plain variables do not trigger re-renders — always use `useState` for data that affects the UI
- The event name is `onClick` (camelCase) in JSX, not `onclick`
- Call the setter function (`setLiked`, `setActiveFilter`) to update state and cause a re-render
- Conditional rendering with `&&` or ternary lets you show/hide content based on state
