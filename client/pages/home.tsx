import React from 'react';
import TodoForm from '../components/todo-form';
import Container from 'react-bootstrap/Container';
import TodoList from '../components/todo-list';
import LoginPage from './accounts';

export default function Home() {
  return (
    <>
      <Container>
        <h1 className="text-center my-4">My Todo List</h1>
        <LoginPage />
        <TodoForm />
        <TodoList />
      </Container>
    </>

  );
}
