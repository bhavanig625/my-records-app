import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Navigation() {
  const { Logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  function handleLogout() {
    try {
      Logout();
      handleNavItemClick();
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  }

  const handleNavItemClick = () => {
    setExpanded(false);
  };

  return (
    <>
      {currentUser && (
        <Navbar
          expand="lg"
          variant="dark"
          sticky="top"
          className="bg-dark"
          expanded={expanded}
        >
          <Container>
            <Link to="/home" className="navbar-brand">
              My App
            </Link>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={() => setExpanded(!expanded)}
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto nav-item">
                <Nav.Link
                  className="nav-link"
                  to="/home"
                  onClick={handleNavItemClick}
                >
                  Home
                </Nav.Link>
                {/* <Nav.Link
                to="/my-docs"
                className="nav-link"
                onClick={handleNavItemClick}
              >
                Documents
              </Nav.Link> */}
                <NavDropdown
                  title="Profile"
                  id="basic-nav-dropdown"
                  menuVariant="dark"
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/profile-update"
                    onClick={handleNavItemClick}
                  >
                    Update Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/change-password"
                    onClick={handleNavItemClick}
                  >
                    Change Password
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
}

export default Navigation;
