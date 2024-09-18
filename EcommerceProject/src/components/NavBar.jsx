import { NavLink } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function NavBar ({ token }) {
    console.log("NavBar token", token);

    return (
        <Navbar fixed="bottom" bg="dark" data-bs-theme="dark">
        <Container>
        <Navbar.Brand href="home">Pickle</Navbar.Brand>
        <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>  |  */}
            <Nav.Link href="/register">Signup</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link> 
            <Nav.Link href="/items">Items</Nav.Link>
            <Nav.Link href="/commentform>"></Nav.Link>
        </Nav>
        </Container>
        </Navbar>
        
    );
}

export default NavBar;