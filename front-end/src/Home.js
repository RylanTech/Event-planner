import { useContext, useEffect, useState } from "react"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link, Outlet } from "react-router-dom"
import { UserContext } from "./UserContext"

function Home() {
  let { isLoggedIn } = useContext(UserContext)
  let [userLog, setUserLog] = useState()

  useEffect(() => {
    async function checking() {
      setUserLog(await isLoggedIn())
    }
    checking()
  }, [])
  document.body.style = 'background: #BCEAD5';

  function loggedIn() {
    return (
      <div>
        <Navbar className="nav-color" expand="lg" variant="dark">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link className="nav-link hover-effect" to="/">Home</Link>
                <Link className="nav-link hover-effect" to="/events">View Events</Link>
                <Link className="nav-link hover-effect" to="/search">Search</Link>
                <Link className="nav-link hover-effect" to="/schedule">Schedule Event</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet />
      </div>
    )
  }

  function notLoggedIn() {
    return (
      <div>
        <Navbar className="nav-color" expand="lg" variant="dark">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link className="nav-link hover-effect" to="/">Home</Link>
                <Link className="nav-link hover-effect" to="/events">View Events</Link>
                <Link className="nav-link hover-effect" to="/search">Search</Link>
                <Link className="nav-link hover-effect" to="/login">Organizer Login</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet />
      </div>
    )
  }

  if (userLog) {
    return loggedIn()
  } else {
    return notLoggedIn()
  }
}
export default Home