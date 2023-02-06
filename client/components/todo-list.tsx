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
  const dispatch = useDispatch();

  const idAttr = `todo-item-${todoId}`;
  const taskClass = isCompleted
    ? 'is-completed'
    : '';

  const handleChange = async (todoId: string) => {
    try {
      const complete = isCompleted ? false : true;
      const statusObject = { todoId, isCompleted: complete}
      const body = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(statusObject)
        }
      const response = await fetch ('api/todos', body);
      console.log({response});
      const update = await response.json();
      if (update) {
        // @ts-ignore
        dispatch(getTodosAsync());
      }
    } catch (err) {
      console.error('There was an error!', err);
    }
  }


    return (
    <li>
      <div>
        <Form.Check type="checkbox" id={idAttr} label={task} className={`${taskClass} fs-4 py-2 px-2 border-bottom border-2 border-light`} onChange={() => handleChange(todoId)}></Form.Check>
      </div>
    </li>
  )
}


export default function TodoList() {
  const todos = useSelector( (state:{ todosList: Todos[]}) => state.todosList);
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
