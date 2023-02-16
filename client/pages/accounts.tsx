import React, { SyntheticEvent, ChangeEvent, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default function LoginPage () {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  function handleChange (e: ChangeEvent<HTMLInputElement>) {
    if (e.target.id === 'username') setUsername(e.target.value);
    if (e.target.id === 'password') setPassword(e.target.value);
  }

  function handleSubmit (e: SyntheticEvent) {
    e.preventDefault();
    if (password === '' || username === '') return;
    const uppercaseCharacters = /[A-Z]/;
    const specialCharacters = /[!@#$%^&*()]/;
    const digit = /\d/;
    if (!uppercaseCharacters.test(password) || !specialCharacters.test(password) || !digit.test(password)) return;

    const createUser = async (username: string, password: string) => {
      try {
        const request = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        }
        const response = await fetch ('/api/auth/sign-up', request);
        const result = response.json();
        console.log('result', result);
        setPassword('');
        setUsername('');
      } catch (err) {
        console.error(err);
      }
    }
    createUser(username, password);
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={10}>
          <h1 className="my-4 text-center">Account Information</h1>
        </Col>
        <Col xs={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor="username" className="fs-5" >Username</Form.Label>
            <Form.Control required id="username" type="text" className="mb-4" onChange={handleChange} />
            <Form.Label htmlFor="password" className="fs-5" >Password</Form.Label>
            <Form.Control required id="password" type="text" className="mb-4" onChange={handleChange}/>
            <div className="text-end">
              <Button type="submit" className="fs-5">Submit</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
