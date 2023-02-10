import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function SecondNavbarr() {
  return (
    <>
      <Navbar
        variant="dark"
        style={{
     
          width: "100%",
         
          background: "rgba(0, 0, 0, 0.8)",
        }}
      >
        <Container>
          <Navbar.Brand>Rent IT</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#features">
              <Link
                to="/user-login"
                style={{ textDecoration: "none", color: "gray" }}
              >
                Login
              </Link>
            </Nav.Link>
            <Nav.Link href="#features">
              <Link
                to="/user-register"
                style={{ textDecoration: "none", color: "gray" }}
              >
                Register
              </Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default SecondNavbarr;
