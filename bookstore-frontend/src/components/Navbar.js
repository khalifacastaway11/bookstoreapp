import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { FaHome, FaBook, FaFilter, FaSearch, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus,FaTools,FaShoppingCart } from 'react-icons/fa';

const NavigationBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role=localStorage.getItem('role');

  console.log("User role:",role);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold">
          Khalifa's Bookstore
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" className="d-flex align-items-center">
              <FaHome className="me-2" /> Home
            </Nav.Link>
            {token && (
              <>
                <Nav.Link as={NavLink} to="/books" className="d-flex align-items-center">
                  <FaBook className="me-2" /> Books
                </Nav.Link>

                {role === "admin" && (
            <Nav.Link as={NavLink} to="/manage-books" className="d-flex align-items-center">
               <FaTools className="me-2" />
              Manage Books
            </Nav.Link>
          )}
                <Nav.Link as={NavLink} to="/filter-books" className="d-flex align-items-center">
                  <FaFilter className="me-2" /> Filter Books
                </Nav.Link>
                <Nav.Link as={NavLink} to="/search-books" className="d-flex align-items-center">
                  <FaSearch className="me-2" /> Search Books
                </Nav.Link>
                <Nav.Link as={NavLink} to="/checkout" className="d-flex align-items-center">
                  <FaShoppingCart className="me-2" /> Checkout
                </Nav.Link>
                <Nav.Link as={NavLink} to="/cart" className='d-flex align-items-center'>
                  <FaShoppingCart className="me-2" /> View Cart
                </Nav.Link>
                <NavDropdown title={<span className="d-flex align-items-center"><FaUser className="me-2" /> Profile</span>} id="basic-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to="/profile">
                    View Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="d-flex align-items-center">
                    <FaSignOutAlt className="me-2" /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            {!token && (
              <>
                <Nav.Link as={NavLink} to="/register" className="d-flex align-items-center">
                  <FaUserPlus className="me-2" /> Register
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login" className="d-flex align-items-center">
                  <FaSignInAlt className="me-2" /> Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;