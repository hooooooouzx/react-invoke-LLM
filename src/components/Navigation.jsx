import { Link } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/">Home</Link>
      <Link to="/chat">Chat</Link>
    </nav>
  )
}

export default Navigation 