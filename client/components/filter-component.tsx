import React from "react";
import Row  from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function FilterTodos (props: { filter: any}) {
  const { filter } = props
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
    </Row>

  )
}
