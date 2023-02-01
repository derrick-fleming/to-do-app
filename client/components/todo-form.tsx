import React from 'react';
import { Row, Col, Form, Button  } from 'react-bootstrap';

export default function TodoForm() {
  return (
    <Row>
      <Col>
        <Form>
          <Form.Label>Task</Form.Label>
          <Form.Control type="text" placeholder="Enter task"></Form.Control>
          <Button type="submit">Submit</Button>
        </Form>
      </Col>
    </Row>
  );
}
