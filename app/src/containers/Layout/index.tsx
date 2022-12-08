import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Layout = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Movie</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Layout;
