## Step 4: Lists, Keys & Forms 📋

You know how to render a component. Now let's render *many* components from data, and capture user input the React way.

---

### 📖 Theory: Lists and Keys

When rendering a list with `.map()`, React needs a unique `key` on each item so it can track additions, removals, and re-orders efficiently:

```jsx
activities.map((a) => (
  <ActivityCard key={a.name} {...a} />  // key is required
))
```

Without `key`, React logs a warning and list updates can behave unexpectedly.

### 📖 Theory: Controlled Inputs

In a **controlled input**, React state is the single source of truth for what's in the field. The input can only change by calling `setState`:

```jsx
// ❌ Uncontrolled — React doesn't know what the user typed
<input type="email" />

// ✅ Controlled — React owns the value
<input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

Always call `e.preventDefault()` in form submit handlers — otherwise the browser reloads the page and you lose all state.

---

### 🐛 The Problems (4 bugs across 2 files)

**`exercises/04-lists-forms/starter/src/components/ActivityList.jsx`**:
```jsx
activities.map((activity) => (
  <li>          // Bug 1: missing key prop
    ...
  </li>
))
```

**`exercises/04-lists-forms/starter/src/components/SignupForm.jsx`**:
```jsx
function handleSubmit() {     // Bug 2: missing event parameter
  // e.preventDefault()       // Bug 3: not called — page reloads
  onSignup(activityName, email)
}
<input
  type="email"
  placeholder="you@school.edu"
  // Bug 4: no value or onChange — uncontrolled
/>
```

---

### 🤖 Prompt Guide

> **Prompt 1:**
> ```
> My React app shows this console warning:
> "Each child in a list should have a unique 'key' prop."
> Here is my component: [paste ActivityList.jsx].
> What is a key prop, why does React require it, and how do I fix it?
> ```

> **Prompt 2:**
> ```
> When I submit my React form the page reloads and I lose all state.
> My onSubmit handler is: [paste handleSubmit]. How do I stop this?
> ```

> **Prompt 3:**
> ```
> What is the difference between a controlled and uncontrolled input in React?
> Can you update my SignupForm so the email input is controlled and the form
> does not reload on submit? [paste SignupForm.jsx]
> ```

---

### ⌨️ Activity: Fix lists and forms

1. Fix `ActivityList.jsx` — add `key={activity.name}` to the `<li>`.
2. Fix `SignupForm.jsx` — resolve all 4 bugs:
   - Add `e` parameter to `handleSubmit(e)`
   - Call `e.preventDefault()`
   - Add `value={email}` and `onChange={(e) => setEmail(e.target.value)}` to the input
3. Run `npm run dev` from `exercises/04-lists-forms/starter/` and test:
   - No key-prop warning in the browser console.
   - Submitting the form does **not** reload the page.
   - The console logs the activity name and email.
   - The input clears after submission.

---

### ✅ Commit to continue

```bash
git add exercises/04-lists-forms/starter/
git commit -m "fix: add key props and controlled form inputs"
git push
```

<details>
<summary>Having trouble? 🤷</summary>

- The `key` goes on the outermost element inside `.map()` — on the `<li>`, not inside it.
- `handleSubmit` needs `(e)` as its parameter before you can call `e.preventDefault()`.
- A controlled input needs **both** `value={...}` and `onChange={...}`.

</details>
