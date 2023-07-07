import { CLOUDFRONT_URL_FAVICON } from "../../constants.js";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function SiteNav(props) {
  const logoUrl = CLOUDFRONT_URL_FAVICON;

  const handleLogout = () => {
    props.logOut();
  };

  return (
    <header>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              alt=""
              src= {logoUrl}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Flora Forecast
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-md-auto">
              <Nav.Link as={Link} to="/homepage">Homepage</Nav.Link>
              <Navbar.Text>|</Navbar.Text>
              <Nav.Link as={Link} to="/payment">Fatturazione</Nav.Link>
              <Navbar.Text>|</Navbar.Text>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default SiteNav;
