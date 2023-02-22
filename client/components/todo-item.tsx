import React from "react";
import { useDispatch } from "react-redux";
import { toggleComplete, deleteTodo, editScreen } from '../redux/todos-slice';
import Form from 'react-bootstrap/Form';

type Todos = {
  task: string,
  isCompleted: boolean,
  todoId: number,
  createdAt: string,
  updatedAt: string
};

export default function TodoItem(props: { todo: Todos, filter: boolean, sort: string }) {
  const { todoId, task, isCompleted } = props.todo;
  const { filter } = props;
  const dispatch = useDispatch();

  const idAttr = `todo-item-${todoId}`;
  const taskClass = isCompleted === filter
    ? ''
    : 'hide-results';


  const handleChange = async (todoId: number) => {
    try {
      const complete = isCompleted ? false : true;
      const statusObject = { todoId, isCompleted: complete }
      const body = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': window.localStorage.getItem('todo-jwt')
        },
        body: JSON.stringify(statusObject)
      }
      const response = await fetch('api/todos', body);
      const update = await response.json();
      if (update) {
        // @ts-ignore
        dispatch(toggleComplete(update));
      }
    } catch (err) {
      console.error('There was an error!', err);
    }
  }

  const handleEdit = async () => {
    try {
      dispatch(editScreen(props.todo))
    } catch(err) {
      console.error('There was an error', err);
    }
  }

  const handleDelete = async (todoId: number) => {
    try {
      const body = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': window.localStorage.getItem('todo-jwt')
        },
        body: JSON.stringify({ todoId })
      };
      const response = await fetch('api/todos', body);
      const deleteStatus = await response.json();
      if (deleteStatus) {
        // @ts-ignore
        dispatch(deleteTodo(todoId));
      }
    } catch (err) {
      console.error('There was an error!', err);
    }
  }


  return (
    <li className={`${taskClass}`}>
      <div>
        <Form.Check type="checkbox" id={idAttr} label={task} className={` width-80 fs-4 py-2 px-2 border-bottom border-2 border-light d-inline-block`} onChange={() => handleChange(todoId)}></Form.Check>
        <button className="d-inline border-0 background-none" onClick={() => handleEdit()}><i className="fa-solid fa-pencil"></i></button>
        <button className="d-inline border-0 background-none" onClick={() => handleDelete(todoId)}><i className="fa-solid fa-trash"></i></button>
      </div>
    </li>
  )
}
