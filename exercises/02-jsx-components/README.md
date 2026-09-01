# Exercise 02: JSX & Functional Components

## What You'll Learn
- The rules of JSX (it is not HTML — there are differences)
- How to build a functional component
- How to pass data into a component using **props**
- How to embed JavaScript expressions inside JSX with `{}`

---

## Core Concept: JSX

JSX looks like HTML but compiles to JavaScript. Because of this, a few things are
different from plain HTML:

| HTML attribute | JSX equivalent | Reason |
|---|---|---|
| `class="..."` | `className="..."` | `class` is a reserved JS keyword |
| `for="..."` | `htmlFor="..."` | `for` is a reserved JS keyword |
| `<input>` | `<input />` | Every JSX element must be closed |

A component can only **return one root element**. If you need siblings, wrap them
in `<>...</>` (a "fragment") or a `<div>`.

**Props** are how you pass data into a component — like arguments to a function.
The component receives an object called `props` (or you can destructure it directly).

```jsx
// Defining a component that accepts props
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>
}

// Using it — pass data as JSX attributes
<Greeting name="Alice" />
```

---

## Starter Code — Spot the Problems

Open `starter/src/App.jsx`:

```jsx
import ActivityCard from './components/ActivityCard'

function App() {
  return (
    <div class="app">          // Bug 1
      <h1>School Activities</h1>
      <ActivityCard            // Bug 2 — two roots, no wrapper
      <ActivityCard
        title="Chess Club"
        description="Learn strategies and compete in tournaments"
      />
    </div>
  )
}

export default App
```

Open `starter/src/components/ActivityCard.jsx`:

```jsx
function ActivityCard() {    // Bug 3 — props not received
  return (
    <div class="card">       // Bug 4
      <h2>{title}</h2>       // Bug 5 — title is undefined
      <p>{description}</p>
    </div>
  )
}

export default ActivityCard
```

There are **5 bugs** across these two files. The browser console will show a mix of
syntax errors and "undefined" rendering.

---

## Debug It With AI

Paste the two files above into your AI assistant and use these prompts:

> **Prompt 1 — Diagnose JSX issues:**
> ```
> I'm learning React JSX. Here are two component files with bugs. Can you list
> every JSX rule violation you find and explain why each one is wrong?
> [paste App.jsx and ActivityCard.jsx]
> ```

> **Prompt 2 — Understand props:**
> ```
> In ActivityCard, the `title` and `description` variables are undefined even though
> I pass them as attributes. Why? How does a functional component receive the data
> I pass to it in JSX?
> ```

> **Prompt 3 — Fix the files:**
> ```
> Please fix all the JSX bugs in these two files and explain each change.
> ```

> **Prompt 4 — Go deeper:**
> ```
> What is a React Fragment (<>...</>) and when would I use it instead of a <div>?
> ```

---

## Your Tasks

1. Copy the starter files into your working directory (or edit them in place).
2. Use the AI prompts above to identify and understand every bug.
3. Fix all 5 bugs so the app renders two activity cards without console errors.
4. **Add a third prop** `schedule` to `ActivityCard` and display it in a `<p>` tag.
5. Open React Developer Tools → Components tab. Click on an `ActivityCard` and
   verify you can see its props listed on the right panel.

---

## How to Know It's Working

- No red errors in the browser console
- Two activity cards visible on screen
- Each card shows a title, description, and schedule
- React DevTools shows `title`, `description`, and `schedule` in the props panel

---

<details>
<summary>Solution (try to solve it first!)</summary>

**App.jsx** — fixed:

```jsx
import ActivityCard from './components/ActivityCard'

function App() {
  return (
    <div className="app">
      <h1>School Activities</h1>
      <>
        <ActivityCard
          title="Chess Club"
          description="Learn strategies and compete in tournaments"
          schedule="Fridays, 3:30 PM"
        />
        <ActivityCard
          title="Drama Club"
          description="Practice acting and stagecraft"
          schedule="Tuesdays, 4:00 PM"
        />
      </>
    </div>
  )
}

export default App
```

**ActivityCard.jsx** — fixed:

```jsx
function ActivityCard({ title, description, schedule }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{schedule}</p>
    </div>
  )
}

export default ActivityCard
```

**What changed:**
1. `class` → `className` (both files)
2. Two adjacent `<ActivityCard>` wrapped in a Fragment `<>...</>`
3. `ActivityCard()` destructures `{ title, description, schedule }` from props
4. Self-closing `<input />` style not needed here, but the missing closing `>` on first `<ActivityCard` was a typo

</details>

---

## Key Takeaways

- JSX is not HTML — `className`, `htmlFor`, and self-closing tags are required
- A component must return exactly one root element; use `<>...</>` for siblings
- Props flow from parent to child as JSX attributes; destructure them in the function signature
- Embed any JS expression inside JSX with `{expression}`
