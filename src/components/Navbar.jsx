import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
const MyNavbar = () => {
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/book/list">Add Listings</Nav.Link>
            <Nav.Link href="/book/orders">Orders</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default MyNavbar
