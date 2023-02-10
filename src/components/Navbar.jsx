import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { loadData } from "./localStorage";

function Navbarr() {

  const type = loadData("type")
  return (
    <>
      <Navbar
        variant="dark"
        style={{
          position: "fixed",
          width: "100%",
          borderBottom:"1px solid white",
       

          zIndex: 2,
          background: "rgba(0, 0, 0, 0.8)",
        }}
      >
        <Container>
          <Navbar.Brand>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              {" "}
              Rent IT
            </Link>
          </Navbar.Brand>
          {type == "agency" ?<Nav className="me-auto" style={{
          
            justifyContent:"space-around",
            width:"300px"
          }}>
            <Link to="/add-car" style={{ textDecoration: "none", color: "gray" }}>
              {" "}
              Add Cars
            </Link>{" "}
            <Link to="/booked-cars" style={{ textDecoration: "none", color: "gray" }}>
              {" "}
              Booked Cars
            </Link>{" "}
          
          </Nav> : ""}
        </Container>
      </Navbar>
    </>
  );
}

export default Navbarr;
