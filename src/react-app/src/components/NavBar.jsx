import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Mergington High
      </Link>
      <Link to="/" className="nav-link">Activities</Link>
    </nav>
  )
}

export default NavBar
