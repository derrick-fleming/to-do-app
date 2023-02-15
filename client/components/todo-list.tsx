import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from "react-redux";
import { sortTodo, getTodosAsync, changeSort } from '../redux/todos-slice';
import FilterTodos from "./filter-component";
import TodoItem from "./todo-item";

type Todos = {
  task: string,
  isCompleted: boolean,
  todoId: string
};

export default function TodoList() {
  const [ filterComplete, setFilterComplete ] = useState(false);

  const todos = useSelector((state: { todosList: {todos: Todos[] } } ) => state.todosList.todos);
  const sort = useSelector((state: {todosList: {todos: Todos[], sort: string}}) => state.todosList.sort);
  console.log('todos value', todos);
  const dispatch = useDispatch();

  function handleFilter (id: string) {
    if (id === "complete") setFilterComplete(true);
    if (id === "incomplete") setFilterComplete(false);
  }

  const toggleRecent = (id: string) => {
    if (id === 'recent' && sort === 'oldest') {
      dispatch(sortTodo('recent'));
      dispatch(changeSort('recent'))
      return;
    }
    if (id === 'oldest' && sort === 'recent') {
      dispatch(sortTodo('oldest'));
      dispatch(changeSort('oldest'));
      return;
    }
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
        filter={filterComplete}
        sort={sort} />
      )
    });

  return (
    <Row className="justify-content-center">
      <Col md={8} xs={11}>
        <FilterTodos filter={handleFilter} sort={sort} toggle={toggleRecent}/>
      </Col>
      <Col md={8} xs={11}>
        <ul>
          {list}
        </ul>
      </Col>
    </Row>
  )
}
