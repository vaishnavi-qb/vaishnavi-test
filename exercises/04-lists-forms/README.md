# Exercise 04: Lists, Keys & Forms

## What You'll Learn
- How to render a dynamic list with `.map()` and the required `key` prop
- Why React requires unique keys on list items
- The difference between **controlled** and **uncontrolled** form inputs
- How to intercept form submission with `e.preventDefault()`

---

## Core Concept: Lists & Keys

When you render a list, React needs a stable `key` on each item so it can track
which item was added, moved, or removed efficiently.

```jsx
activities.map((activity) => (
  <ActivityCard key={activity.name} {...activity} />
  //            ^^^ required — must be unique among siblings
))
```

Without `key`, React logs a warning and list updates can behave unexpectedly.

## Core Concept: Controlled Inputs

In a **controlled input**, React state is the single source of truth for the input's
value. The input can only change through `onChange` calling `setState`.

```jsx
// Uncontrolled — React doesn't know what the user typed
<input type="email" />

// Controlled — React owns the value
<input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

---

## Starter Code — Spot the Problems

Open `starter/src/components/ActivityList.jsx`:

```jsx
function ActivityList({ activities }) {
  return (
    <ul>
      {activities.map((activity) => (
        <li>          {/* Bug 1 — missing key prop */}
          <strong>{activity.name}</strong>: {activity.description}
        </li>
      ))}
    </ul>
  )
}

export default ActivityList
```

Open `starter/src/components/SignupForm.jsx`:

```jsx
import { useState } from 'react'

function SignupForm({ activityName, onSignup }) {
  const [email, setEmail] = useState('')

  function handleSubmit() {   // Bug 2 — missing event parameter
    // Bug 3 — no e.preventDefault(), page will reload
    onSignup(activityName, email)
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Your email</label>
      <input
        id="email"
        type="email"
        placeholder="you@school.edu"
        {/* Bug 4 — uncontrolled: no value or onChange */}
      />
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignupForm
```

---

## Debug It With AI

> **Prompt 1 — React key warning:**
> ```
> My React app is showing this console warning:
> "Each child in a list should have a unique 'key' prop."
> Here is my component: [paste ActivityList.jsx].
> What is a key prop, why does React require it, and how do I add it?
> ```

> **Prompt 2 — Controlled vs uncontrolled:**
> ```
> I have a React form with an email input. When I submit the form, I want to
> read what the user typed. Should I use a controlled or uncontrolled input?
> What is the difference and which approach does React recommend?
> ```

> **Prompt 3 — Page reloading on submit:**
> ```
> When my form is submitted, the page reloads and I lose all state.
> My onSubmit handler is: [paste handleSubmit]. How do I stop the page
> from reloading on form submission in React?
> ```

> **Prompt 4 — Wire it all up:**
> ```
> Can you fix my SignupForm component so it: (1) uses a controlled input
> bound to the `email` state, (2) prevents page reload on submit, and (3)
> calls onSignup with the activity name and email?
> [paste SignupForm.jsx]
> ```

---

## Your Tasks

1. Fix `ActivityList.jsx` — add the `key` prop to each `<li>`. Use `activity.name` as the key.
2. Fix `SignupForm.jsx` — address all 4 bugs:
   - Add `e` parameter to `handleSubmit`
   - Call `e.preventDefault()`
   - Add `value={email}` and `onChange={(e) => setEmail(e.target.value)}` to the input
3. In `App.jsx`, wire up `onSignup` to log `(activityName, email)` to the console.
4. Test: fill in the form and submit — confirm the page does NOT reload and the
   console shows the values, then the input clears.

---

## How to Know It's Working

- No "key prop" warning in the browser console
- Submitting the form does not cause a page reload
- The console logs the activity name and email after submission
- The email input clears after submission

---

<details>
<summary>Solution (try to solve it first!)</summary>

**ActivityList.jsx** — fixed:

```jsx
function ActivityList({ activities }) {
  return (
    <ul>
      {activities.map((activity) => (
        <li key={activity.name}>          {/* Fix 1 */}
          <strong>{activity.name}</strong>: {activity.description}
        </li>
      ))}
    </ul>
  )
}

export default ActivityList
```

**SignupForm.jsx** — fixed:

```jsx
import { useState } from 'react'

function SignupForm({ activityName, onSignup }) {
  const [email, setEmail] = useState('')

  function handleSubmit(e) {          // Fix 2: event parameter
    e.preventDefault()                // Fix 3: prevent reload
    onSignup(activityName, email)
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Your email</label>
      <input
        id="email"
        type="email"
        placeholder="you@school.edu"
        value={email}                              // Fix 4a: controlled value
        onChange={(e) => setEmail(e.target.value)} // Fix 4b: onChange handler
      />
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignupForm
```

</details>

---

## Key Takeaways

- Every item in a `.map()` list needs a unique, stable `key` prop on the outermost element
- Controlled inputs bind `value` to state and `onChange` updates state — React owns the value
- Always call `e.preventDefault()` in form submit handlers to stop the browser's default reload
- Clearing the input after submit is done by resetting the state: `setEmail('')`
