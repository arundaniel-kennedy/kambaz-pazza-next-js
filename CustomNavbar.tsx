import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function CustomNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Pazza</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">CS5200 DBMS</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                CS5610 Web dev
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">CS6120 NLP</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                CS5100 PDP
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#home">Q & A</Nav.Link>
            <Nav.Link href="#link">Resources</Nav.Link>
            <Nav.Link href="#link">Statistics</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
