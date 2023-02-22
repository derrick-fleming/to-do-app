import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { Row, Col, Form, Button  } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoEnd, addTodoStart, updateTodo, removeEditScreen } from '../redux/todos-slice';

type Todo = {
  task: string,
  isCompleted: boolean,
  todoId: number,
  createdAt: string,
  updatedAt: string
};

export default function TodoForm() {
  const [todoItem, setTodoItem] = useState('');
  const sort = useSelector((state: { todosList: { sort: string } }) => state.todosList.sort)
  const editTodo = useSelector((state: { todosList: {editItem: Todo}}) => state.todosList.editItem);
  const dispatch = useDispatch();

  const keys = Object.keys(editTodo);

  useEffect(() => {
    if (keys.length > 0) {
      setTodoItem(editTodo.task);
    }
  }, [editTodo]);


  const writeItem = (e: ChangeEvent<HTMLInputElement>) => setTodoItem(e.target.value);

  function handleSubmit (e: SyntheticEvent){
    e.preventDefault();
    const patchTodo = async (body: {}) => {
      try {
      const response = await fetch('/api/todos', body);
      const todo = await response.json();
      if (todo) {
        if (sort === 'recent') {
          dispatch(addTodoStart(todo));
        } else {
          dispatch(addTodoEnd(todo));
        }
        setTodoItem('');
      }
    } catch (error) {
      console.error(error);
    }
    }

    const putTodo = async (body: {}, item: Todo) => {
      try {
        const response = await fetch('/api/todos', body);
        const todo = await response.json();
        if (todo) {
          dispatch(updateTodo(item));
          dispatch(removeEditScreen());
        }
        setTodoItem('');
      } catch (error) {
        console.error(error);
      }
    }

      if (todoItem.length === 0) {
        return;
      }
      const newTodo = { todoItem, isComplete: false };

      let body = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': window.localStorage.getItem('todo-jwt')
        },
        body: JSON.stringify(newTodo)
      };
      if (keys.length === 0 ) {
        patchTodo(body);
        return;
      }
      const upTodo = { ...editTodo }
      upTodo.task = todoItem;
      body = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': window.localStorage.getItem('todo-jwt')
        },
        body: JSON.stringify(upTodo)
      };
      putTodo(body, upTodo);
    }

  const cancelButton = keys.length > 0
    ? <Button className="fs-6 me-4 btn-secondary">Cancel</Button>
    : '';

  return (
    <Row className="justify-content-center">
      <Col md={8} xs={11}>
        <Form onSubmit={handleSubmit}>
          <Form.Label htmlFor="todo" className="fs-4">Write your Task</Form.Label>
          <Form.Control required id="todo" type="text" placeholder="Enter task" className="my-2" value={todoItem} onChange={writeItem}></Form.Control>
          <div className="text-end">
            {cancelButton}
            <Button type="submit" className="fs-6">Submit</Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}
