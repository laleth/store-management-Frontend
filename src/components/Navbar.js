import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function NavbarReact() {
  return (
    <Navbar className="bg-body-tertiary" bg='dark' data-bs-theme="dark" >
      <Container>
        <Navbar.Brand href="#home">Welcome to TronMart</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Laleth</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarReact;