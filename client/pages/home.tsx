import React from 'react';
import TodoForm from '../components/todo-form';
import { Container } from 'react-bootstrap';
import TodoList from '../components/todo-list';
import LoginPage from './accounts';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Home() {
  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Todos</Navbar.Brand>
          <Navbar.Toggle aria-controls="response-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="#home">My List</Nav.Link>
              <Nav.Link href="#login">Login</Nav.Link>
              <Nav.Link href="#logout">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <h1 className="text-center my-4">My Todo List</h1>
        <LoginPage />
        <TodoForm />
        <TodoList />
      </Container>
    </>

  );
}
