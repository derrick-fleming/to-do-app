import React, { useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from "react-redux";
import { getTodosAsync } from '../redux/todos-slice';
import Form from 'react-bootstrap/Form';

type Todos = {
  task: string,
  isCompleted: boolean,
  todoId: string
};



function TodoItem(props: { todo: { todoId: string, task: string, isCompleted: boolean } }) {
  const { todoId, task, isCompleted } = props.todo;
  const idAttr = `todo-item-${todoId}`;
  const taskClass = isCompleted
    ? 'is-completed'
    : '';
  return (
    <li>
      <div>
        <Form.Check type="checkbox" id={idAttr} label={task} className={`${taskClass} fs-4 py-2 px-2 border-bottom border-2 border-light`}></Form.Check>
      </div>
    </li>
  )
}


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
        <TodoItem
        key={todo.todoId}
        todo={todo} />
      )
    });

  return (
    <Row className="justify-content-center">
      <Col md={8} xs={11}>
        <ul>
          {list}
        </ul>
      </Col>
    </Row>
  )
}
