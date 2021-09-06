import { Link, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navigation = () => {
  const { isAuthenticated, signOut } = useContext(AuthContext);
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <span className="text-light"> World Builder </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" exact>
              <span className="text-light"> Home </span>
            </Nav.Link>
            {isAuthenticated ? (
              <>
                <Nav.Link as={NavLink} to="/user-area" exact>
                  <span className="text-light">Dashboard</span>
                </Nav.Link>
                <Nav.Link onClick={signOut}>
                  <span className="text-light"> Log out</span>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/register" exact>
                  <span className="text-light">Register</span>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login" exact>
                  <span className="text-light">Log in</span>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
