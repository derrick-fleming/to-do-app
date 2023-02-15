import React, { useState } from "react";
import Row  from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function FilterTodos (props: { filter: any, sort: string, toggle: any } ) {
  const { filter, sort, toggle } = props

  const recentSort = sort === 'recent'
    ? 'selected'
    : '';

  const oldestSort = sort === 'oldest'
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
        <button className={oldestSort} onClick={() => toggle('oldest')}>
          Sort by oldest
        </button>
        <p className="d-inline"> | </p>
        <button className={recentSort} onClick={() => toggle('recent')}>
          Sort by most recent
        </button>
      </Col>
    </Row>

  )
}
