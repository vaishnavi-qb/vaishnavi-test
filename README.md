# React Foundations: Beginner Track

Build a **School Activity Signup SPA** step by step, learning modern React from scratch while guided by an AI assistant.

---

## Start Here

> **If you are a learner**, do not clone this repo directly — copy it to your own account first so GitHub can track your progress and post each exercise automatically.

**Step 1 — Copy the repo to your account:**

Click the button below (or the green **"Use this template ▾"** button in the GitHub toolbar above), then choose **"Create a new repository"**:

[![Use this template](https://img.shields.io/badge/Use_this_template-238636?style=for-the-badge&logo=github&logoColor=white)](https://github.com/IreneRoseJ/Beginner-Track-Foundations-Core-React-/generate)


**Step 2 — Wait ~30 seconds.**

GitHub Actions will create **Issue #1** in your copy with your first exercise. Each time you commit a fix and push to `main`, the next exercise will appear as a comment in that issue.

**Step 3 — Clone your copy and open it in VS Code:**

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME
cd YOUR-REPO-NAME
code .
```

---

## How This Track Works

Each exercise is **debug-first, prompt-driven**:

1. Read the exercise in Issue #1 (or the `exercises/` folder)
2. Open the broken starter code in `exercises/0N-topic/starter/`
3. Use the **AI prompt guide** in the exercise to diagnose and fix the bug
4. Commit your fix and push to `main` — the next exercise appears automatically

> **You are not expected to memorise syntax.** The goal is to understand *what* each concept does and *how to describe problems to an AI assistant* so it produces the right code.

---

## What You'll Build

A fully functional Single Page Application where students can:
- Browse extracurricular activities
- View participants and available slots
- Sign up for an activity with their email
- Navigate between pages without a full page reload

---

## Local Setup

Everything runs on your own machine — no cloud environment required.

### 1. Install Node.js

Download and install **Node.js 18 or later** from [nodejs.org](https://nodejs.org/).
After installing, verify it works:

```bash
node -v   # should print v18.x.x or higher
npm -v    # should print 9.x.x or higher
```

### 2. Install VS Code extensions

Open VS Code and install:
| Extension | Why |
|---|---|
| ESLint (`dbaeumer.vscode-eslint`) | Underlines JS/React mistakes as you type |
| Prettier (`esbenp.prettier-vscode`) | Auto-formats code on save |
| ES7+ React snippets (`dsznajder.es7-react-js-snippets`) | Type `rafce` + Tab to scaffold a component |

### 3. Start the Python Backend *(only needed from Exercise 05 onwards)*

```bash
pip install -r requirements.txt
uvicorn src.app:app --reload --port 8000
```

The API lives at `http://localhost:8000`. Endpoints:
- `GET /activities` — list all activities
- `POST /activities/{name}/signup?email={email}` — sign up a student

---

## Exercises

| # | Topic | Key Concepts |
|---|-------|-------------|
| [01](exercises/01-tooling/README.md) | Tooling & Dev Environment | npm, package.json, Vite, React DevTools |
| [02](exercises/02-jsx-components/README.md) | JSX & Functional Components | JSX rules, functional components, props |
| [03](exercises/03-state-events/README.md) | State & Event Handling | `useState`, `onClick`, conditional rendering |
| [04](exercises/04-lists-forms/README.md) | Lists, Keys & Forms | `.map()`, `key` prop, controlled inputs, form submit |
| [05](exercises/05-useeffect-fetch/README.md) | useEffect & Data Fetching | `useEffect`, async/await, native `fetch` |
| [06](exercises/06-api-integration/README.md) | API Integration | Connecting to a REST backend, error/loading states |
| [07](exercises/07-routing/README.md) | Client-Side Routing | React Router, `<BrowserRouter>`, `<Link>`, `useParams` |

---

## Reference Application

A complete, working version of the app lives in [`src/react-app/`](src/react-app/).

```bash
cd src/react-app
npm install
npm run dev   # http://localhost:5173
```

---

&copy; 2025 · [MIT License](LICENSE)
