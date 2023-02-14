import React, { useState } from "react";
import Row  from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch } from 'react-redux';
import { sortTodo } from "../redux/todos-slice";

export default function FilterTodos (props: { filter: any}) {
  const [ recent, setRecent ] = useState('oldest');
  const { filter } = props
  const dispatch = useDispatch();

  const toggleRecent = (id: string) => {
    if (id === 'recent' && recent === 'oldest') {
      dispatch(sortTodo());
      setRecent('recent');
      return;
    }
    if (id === 'oldest' && recent === 'recent') {
      dispatch(sortTodo());
      setRecent('oldest');
      return;
    }
  }

  const recentSort = recent === 'recent'
    ? 'selected'
    : '';

  const oldestSort = recent === 'oldest'
    ? 'selected'
    : '';

  return (
    <Row className="mt-4 mb-2">
      <Col xs={4}>
        <h2>Todos</h2>
      </Col>
      <Col className="text-end" xs={8}>
        <button className="btn-link" id="complete" onClick={() => filter("complete")}>
          Complete
        </button>
        <p className="d-inline"> | </p>
        <button className="btn-link" id="incomplete" onClick={() => filter("incomplete")}>
          Incomplete
        </button>
      </Col>
      <Col>
        <button className={oldestSort} onClick={() => toggleRecent('oldest')}>
          Sort by oldest
        </button>
        <p className="d-inline"> | </p>
        <button className={recentSort} onClick={() => toggleRecent('recent')}>
          Sort by most recent
        </button>
      </Col>
    </Row>

  )
}
