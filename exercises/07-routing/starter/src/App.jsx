// Bug 2: Routes and Route are not set up — the same component always renders
// Bug 3: <a href> causes full page reload instead of client-side navigation

import HomePage from './pages/HomePage'
import ActivityDetailPage from './pages/ActivityDetailPage'

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <a href="/">Home</a>
        <a href="/activities/Chess%20Club">Chess Club Detail</a>
      </nav>
      {/* Bug 2: always renders HomePage regardless of URL */}
      <HomePage />
    </div>
  )
}

export default App
