import React, { useEffect } from 'react';
import TodoForm from '../components/todo-form';
import Container from 'react-bootstrap/Container';
import TodoList from '../components/todo-list';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const userValue = useSelector((state: { user: { username: string }}) => state.user.username)

  useEffect(() => {
    if (userValue === null) {
      navigate('/login');
    }
  }, []);

  if (userValue == null) return;

  return (
    <>
      <Container>
        <h1 className="text-center my-4">My Todo List</h1>
        <TodoForm />
        <TodoList />
      </Container>
    </>

  );
}
