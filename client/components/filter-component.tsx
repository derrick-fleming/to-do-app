import React from "react";
import Row  from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function FilterTodos (props: { filter: any}) {
  const { filter } = props
  return (
    <Row className="mt-4 mb-2">
      <Col xs={6}>
        <h6 className="d-inline-block">
          Filter Results
        </h6>
      </Col>
      <Col className="text-end" xs={6}>
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
