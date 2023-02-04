import React, { useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/generate-store";

type Todos = {
  task: string,
  isCompleted: boolean,
  id: string
};

export default function TodoList() {
  const todos = useSelector((state: { todosList: {todos: Todos[]}}) => state.todosList.todos);
  const dispatch = useDispatch();

  useEffect (() => {
    const fetchData = async() => {
      try {
        const data = await fetch('/api/todos');
        const todos = await data.json();
        dispatch({type: 'getLists', todos});
      } catch (e) {
        console.error(e);
      }
    }

    fetchData();
    store.subscribe(store.getState);
  }, []);

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
