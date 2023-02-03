import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from "react-redux";

type Todos = {
  task: string,
  isCompleted: boolean,
  id: string
};

export default function TodoList() {
  const todos = useSelector((state: { todosList: {todos: Todos[]}}) => state.todosList.todos);
  console.log(todos);
  const list = todos.map(todo => {
    return (
      <li key={todo.id}>
        <h1>{todo.task}</h1>
      </li>
    )
  })

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
