## Step 2: JSX & Functional Components ⚛️

Great work setting up your environment! Now let's learn how React components are written and how data flows between them.

---

### 📖 Theory: JSX and Props

JSX looks like HTML but compiles to JavaScript — so a few things differ from plain HTML:

| HTML | JSX | Why |
|------|-----|-----|
| `class="..."` | `className="..."` | `class` is a reserved JS keyword |
| `for="..."` | `htmlFor="..."` | `for` is a reserved JS keyword |
| `<input>` | `<input />` | Every element must be closed |

A component can only **return one root element**. Wrap siblings in `<>...</>` (a Fragment) or a `<div>`.

**Props** are how you pass data *into* a component — like arguments to a function:

```jsx
function Greeting({ name }) {      // destructure from props object
  return <h1>Hello, {name}!</h1>   // embed JS with {}
}
<Greeting name="Alice" />
```

---

### 🐛 The Problems (5 bugs across 2 files)

**`exercises/02-jsx-components/starter/src/App.jsx`**
```jsx
<div class="app">          // Bug 1
  <h1>School Activities</h1>
  <ActivityCard            // Bug 2 — two roots, no wrapper
  <ActivityCard title="Chess Club" description="..." />
</div>
```

**`exercises/02-jsx-components/starter/src/components/ActivityCard.jsx`**
```jsx
function ActivityCard() {    // Bug 3 — props not received
  return (
    <div class="card">       // Bug 4
      <h2>{title}</h2>       // Bug 5 — title is undefined
      <p>{description}</p>
    </div>
  )
}
```

---

### 🤖 Prompt Guide

> **Prompt 1:**
> ```
> I'm learning React JSX. Here are two component files with bugs.
> Can you list every JSX rule violation you find and explain why each one is wrong?
> [paste both files]
> ```

> **Prompt 2:**
> ```
> In ActivityCard, `title` and `description` are undefined even though I pass them
> as attributes. Why? How does a functional component receive the data I pass to it?
> ```

---

### ⌨️ Activity: Fix the JSX errors

1. Open the two files in `exercises/02-jsx-components/starter/src/`.
2. Use the prompts above to understand every bug.
3. Fix all 5 bugs.
4. **Bonus:** Add a `schedule` prop to `ActivityCard` and display it in a `<p>` tag.
5. Run `npm run dev` from `exercises/02-jsx-components/starter/` and confirm two activity cards render without console errors.
6. Open React DevTools → Components tab → click an `ActivityCard` — confirm you can see its props in the right panel.

---

### ✅ Commit to continue

```bash
git add exercises/02-jsx-components/starter/
git commit -m "fix: correct JSX errors and wire up props"
git push
```

<details>
<summary>Having trouble? 🤷</summary>

- There are bugs in **both** files — make sure you check `App.jsx` and `ActivityCard.jsx`.
- `class` → `className` in **both** files.
- The function signature `function ActivityCard()` needs to become `function ActivityCard({ title, description })`.

</details>
