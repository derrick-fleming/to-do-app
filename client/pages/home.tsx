import React from 'react';
import TodoForm from '../components/todo-form';
import { Container } from 'react-bootstrap';

export default function Home() {
  return (
    <Container>
      <h1 className="text-center mt-4">My Todo List</h1>
      <TodoForm />
    </Container>
  );
}
