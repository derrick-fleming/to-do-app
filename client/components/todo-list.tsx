import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from "react-redux";
import { getTodosAsync, toggleComplete, deleteTodo } from '../redux/todos-slice';
import Form from 'react-bootstrap/Form';
import FilterTodos from "./filter-component";

type Todos = {
  task: string,
  isCompleted: boolean,
  todoId: string
};

export function TodoItem(props: { todo: Todos, filter: boolean }) {
  const { todoId, task, isCompleted } = props.todo;
  const { filter } = props;
  const dispatch = useDispatch();

  const idAttr = `todo-item-${todoId}`;
  const taskClass = isCompleted === filter
    ? ''
    : 'hide-results';

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
      const update = await response.json();
      if (update) {
        // @ts-ignore
        dispatch(toggleComplete(update));
      }
    } catch (err) {
      console.error('There was an error!', err);
    }
  }

  const handleDelete = async (todoId: string) => {
    try {
      const body = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({todoId})
      };
      const response = await fetch ('api/todos', body);
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
        <button className="d-inline border-0 background-none" onClick={() => handleDelete(todoId)}><i className="fa-solid fa-trash"></i></button>
      </div>
    </li>
  )
}


export default function TodoList() {
  const [ filterComplete, setFilterComplete ] = useState(false);
  const todos = useSelector( (state:{ todosList: Todos[]}) => state.todosList);
  const dispatch = useDispatch();

  function handleFilter (id: string) {
    if (id === "complete") setFilterComplete(true);
    if (id === "incomplete") setFilterComplete(false);
  }

  useEffect (() => {
    // @ts-ignore
    dispatch(getTodosAsync());
  }, [dispatch]);

  const list = todos.length === 0 ? 'Loading...' :
    todos.map(todo => {
      return (
        <TodoItem
        key={todo.todoId}
        todo={todo}
        filter={filterComplete} />
      )
    });

  return (
    <Row className="justify-content-center">
      <Col md={8} xs={11}>
        <FilterTodos filter={handleFilter}/>
      </Col>
      <Col md={8} xs={11}>
        <ul>
          {list}
        </ul>
      </Col>
    </Row>
  )
}
