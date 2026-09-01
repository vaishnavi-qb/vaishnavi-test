## Step 1: Tooling & Dev Environment 🔧

Welcome to the **React Foundations** exercise! Over the next 7 steps you will build a School Activity Signup SPA by fixing intentionally broken code — guided by your AI assistant at every turn.

> **How this works:** Each step has broken or incomplete starter code in the `exercises/` folder. Fix the files, commit to `main`, and this issue will automatically update with the next step.

---

### 📖 Theory: npm, package.json, and Vite

Think of `package.json` as a recipe card for your project:
- **dependencies** — libraries your app needs to *run* (React, React DOM)
- **devDependencies** — tools only needed *during development* (Vite, the React plugin)
- **scripts** — shortcuts like `npm run dev` to start the dev server

**Vite** bundles your app for development and production. For React it needs `@vitejs/plugin-react` to understand `.jsx` files — without it, JSX simply fails.

---

### 🐛 The Problem

Open `exercises/01-tooling/starter/`. Run the app and you get:

```
Transform failed with 1 error:
... JSX is not enabled.
```

**Files to look at:**
- `exercises/01-tooling/starter/package.json`
- `exercises/01-tooling/starter/vite.config.js`

---

### 🤖 Prompt Guide — Ask Your AI Assistant

> **Prompt 1:**
> ```
> I'm setting up a React project with Vite. When I run `npm run dev` I get:
> "JSX is not enabled."
> Here is my vite.config.js: [paste]. Here is my package.json: [paste].
> What is missing and why does this error happen?
> ```

> **Prompt 2:**
> ```
> What is the difference between dependencies and devDependencies in package.json?
> Should @vitejs/plugin-react be in dependencies or devDependencies, and why?
> ```

---

### ⌨️ Activity: Fix the Vite config

1. Open your local copy of this repo in VS Code.
2. Navigate to `exercises/01-tooling/starter/`.
3. Use the prompts above with your AI assistant to identify the two missing pieces.
4. Fix `package.json` — add the missing package to `devDependencies`.
5. Fix `vite.config.js` — import and register the React plugin.
6. Run `npm install` then `npm run dev` — confirm the browser shows "Hello, React!" at `http://localhost:5173`.
7. **Install React Developer Tools** in your browser (search Chrome/Firefox Web Store). After installing, open DevTools (F12) and confirm a **Components** tab appears.

---

### ✅ Commit to continue

Once the dev server runs without errors, commit your changes:

```bash
git add exercises/01-tooling/starter/
git commit -m "fix: add React plugin to Vite config"
git push
```

Mona will check your work and post the next step here. 👀

<details>
<summary>Having trouble? 🤷</summary>

- Make sure you edited files inside `exercises/01-tooling/starter/`, not elsewhere.
- Run `npm install` after editing `package.json` — it must download the new package.
- The fix requires **two** changes: one in `package.json` and one in `vite.config.js`.

</details>
