import React, { ChangeEvent, FormEvent, SyntheticEvent, useState } from 'react';
import { Row, Col, Form, Button  } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getTodosAsync } from '../redux/todos-slice';

export default function TodoForm() {
  const [todoItem, setTodoItem] = useState('');
  const dispatch = useDispatch();

  const writeItem = (e: ChangeEvent<HTMLInputElement>) => setTodoItem(e.target.value);

  function handleSubmit (e: SyntheticEvent){
    e.preventDefault();
    const patchTodo = async (body: {}) => {
      try {
      const response = await fetch('/api/todos', body);
      const todo = await response.json();
      if (todo) {
        // @ts-ignore
        dispatch(getTodosAsync());
        setTodoItem('');
      }
    } catch (error) {
      console.error(error);
    }
    }

      if (todoItem.length === 0) {
        return;
      }
      const newTodo = { todoItem, isComplete: false };
      const body = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
      };
      patchTodo(body);
}

  return (
    <Row className="justify-content-center">
      <Col md={8} xs={11}>
        <Form onSubmit={handleSubmit}>
          <Form.Label htmlFor="todo" className="fs-4">Write your Task</Form.Label>
          <Form.Control id="todo" type="text" placeholder="Enter task" className="my-2" value={todoItem} onChange={writeItem}></Form.Control>
          <div className="text-end">
            <Button type="submit" className="fs-4">Submit</Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}
