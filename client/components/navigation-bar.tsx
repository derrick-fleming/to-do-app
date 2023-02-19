import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../redux/auth-slice";

export default function NavigationBar () {
  const user = useSelector((state: { user: {username: string}}) => state.user.username);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
    window.localStorage.removeItem('todo-jwt');
  }

  const logInfo = user === null
    ? <Nav.Link as={Link} to={'/login'}>Login</Nav.Link>
    : <Nav.Link as={Link} to={'/login'} onClick={handleLogout}>Logout</Nav.Link>

  return (<Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand as={Link} to={'/'} >Todos</Navbar.Brand>
      <Navbar.Toggle aria-controls="response-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <Nav.Link as={Link} to={'/'} >My List</Nav.Link>
          {logInfo}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
