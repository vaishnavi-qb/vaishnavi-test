# Exercise 01: Tooling & Dev Environment

## What You'll Learn
- How to set up a local React development environment
- What `package.json` does and why it matters
- How Vite makes React development fast
- How to identify and fix a missing dependency using an AI assistant
- How to install React Developer Tools

---

## Before You Start — Local Environment Setup

You will do all your work in your own code editor on your own machine.

### 1. Install Node.js

Download **Node.js 18 LTS** (or later) from [nodejs.org](https://nodejs.org/).  
After installing, open your terminal and verify:

```bash
node -v   # should print v18.x.x or higher
npm -v    # should print 9.x.x or higher
```

If the commands are not found, restart your terminal and try again.

### 2. Open the repo in VS Code

Open the cloned repo folder in VS Code. Make sure these three extensions are installed
(search for them in the Extensions panel on the left sidebar):

| Extension | ID | Why |
|---|---|---|
| ESLint | `dbaeumer.vscode-eslint` | Underlines JS/JSX mistakes as you type |
| Prettier | `esbenp.prettier-vscode` | Auto-formats code on save |
| ES7+ React snippets | `dsznajder.es7-react-js-snippets` | Type `rafce` + Tab to scaffold a component |

### 3. Open a terminal inside VS Code

Use **Terminal → New Terminal** (or `` Ctrl+` ``). All `npm` commands in these exercises
run here — you never need a separate terminal window.

---

## Core Concept: npm, package.json, and Vite

Think of `package.json` as a recipe card for your project. It lists:
- **dependencies** — libraries your app needs to *run* (React, React DOM)
- **devDependencies** — tools only needed *during development* (Vite, the React plugin)
- **scripts** — shortcuts like `npm run dev` that start the dev server

**Vite** is the build tool. It serves your files during development with instant
hot-reload and bundles everything for production. For React, Vite needs its official
plugin (`@vitejs/plugin-react`) to understand `.jsx` files.

---

## Starter Code — Spot the Problem

Navigate to the starter in your terminal:

```bash
cd exercises/01-tooling/starter
```

Open `package.json` — something is wrong with the dependencies:

```json
{
  "name": "school-activities",
  "version": "0.1.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "vite": "^5.4.0"
  }
}
```

Open `vite.config.js`:

```js
import { defineConfig } from 'vite'

export default defineConfig({
  // Nothing here yet
})
```

Try running the app:

```bash
npm install
npm run dev
```

You will see an error like:

```
Transform failed with 1 error:
... JSX is not enabled.
```

---

## Debug It With AI

Copy the error message and the two files above into your AI assistant and try
these prompts:

> **Prompt 1 — Understand the error:**
> ```
> I'm setting up a React project with Vite. When I run `npm run dev` I get:
> "JSX is not enabled."
> Here is my vite.config.js: [paste]. Here is my package.json: [paste].
> What is missing and why does this error happen?
> ```

> **Prompt 2 — Ask for the fix:**
> ```
> How do I configure Vite to support React JSX? What package do I need to install
> and how should I update vite.config.js?
> ```

> **Prompt 3 — Understand the concept:**
> ```
> What is the difference between `dependencies` and `devDependencies` in package.json?
> Should @vitejs/plugin-react go in dependencies or devDependencies, and why?
> ```

---

## Your Tasks

1. **Fix `package.json`** — add the missing devDependency the AI identified.
2. **Fix `vite.config.js`** — import and register the React plugin.
3. Run `npm install` (downloads the new package), then `npm run dev`.
4. Open `http://localhost:5173` in your browser — you should see "Hello, React!".
5. **Install React Developer Tools** in your browser:
   - Chrome: search "React Developer Tools" in the Chrome Web Store
   - Firefox: search "React Developer Tools" in Firefox Add-ons
   - After installing, open DevTools (F12) — you should see **Components** and **Profiler** tabs.

---

## How to Know It's Working

- `npm run dev` prints `Local: http://localhost:5173/` with no errors
- The browser shows the heading "Hello, React!"
- Browser DevTools (F12) has a **Components** tab

---

<details>
<summary>Solution (try to solve it first!)</summary>

**package.json** — add `@vitejs/plugin-react`:

```json
{
  "name": "school-activities",
  "version": "0.1.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "vite": "^5.4.0",
    "@vitejs/plugin-react": "^4.3.1"
  }
}
```

**vite.config.js**:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

Run `npm install` after editing `package.json`.

</details>

---

## Key Takeaways

- Vite does not understand JSX out of the box — it needs `@vitejs/plugin-react`
- `package.json` declares what the project needs; `npm install` actually downloads it
- React Developer Tools let you inspect your component tree live — use it in every exercise
