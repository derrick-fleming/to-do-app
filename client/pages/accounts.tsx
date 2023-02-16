import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default function LoginPage () {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={10}>
          <h1 className="my-4 text-center">Account Information</h1>
        </Col>
        <Col xs={6}>
          <Form>
            <Form.Label htmlFor="username" className="fs-5" >Username</Form.Label>
            <Form.Control id="username" type="text" className="mb-4"/>
            <Form.Label htmlFor="password" className="fs-5" >Password</Form.Label>
            <Form.Control id="password" type="text" className="mb-4"/>
            <div className="text-end">
              <Button type="submit" className="fs-5">Submit</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
