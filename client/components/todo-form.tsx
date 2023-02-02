import React from 'react';
import { Row, Col, Form, Button  } from 'react-bootstrap';

export default function TodoForm() {
  return (
    <Row className="justify-content-center">
      <Col md={8} xs={11}>
        <Form>
          <Form.Label htmlFor="todo" className="fs-5">Write your Task</Form.Label>
          <Form.Control id="todo" type="text" placeholder="Enter task" className="my-2"></Form.Control>
          <div className="text-end">
            <Button type="submit" className="fs-5">Submit</Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}
