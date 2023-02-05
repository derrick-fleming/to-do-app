import React, { useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from "react-redux";
import { getTodosAsync } from '../redux/todos-slice';

type Todos = {
  task: string,
  isCompleted: boolean,
  todoId: string
};

export default function TodoList() {
  const todos = useSelector( (state:{ todosList: Todos[]}) => state.todosList);
  console.log(useSelector (state => state));
  const dispatch = useDispatch();

  useEffect (() => {
    // @ts-ignore
    dispatch(getTodosAsync());
  }, [dispatch]);
  const list = todos.length === 0 ? 'Loading...' :
    todos.map(todo => {
      return (
        <li key={todo.todoId}>
          <h1>{todo.task}</h1>
        </li>
      )
    });

  return (
    <Row>
      <Col>
        <ul>
          {list}
        </ul>
      </Col>
    </Row>
  )
}
