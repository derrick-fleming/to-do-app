import React, { SyntheticEvent, ChangeEvent, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage (props: {page: string, signIn:Function}) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState('');
  const { page, signIn } = props;
  const navigate = useNavigate();

  function handleChange (e: ChangeEvent<HTMLInputElement>) {
    if (e.target.id === 'username') setUsername(e.target.value);
    if (e.target.id === 'password') setPassword(e.target.value);
    setError('');
  }

  function handleSubmit (e: SyntheticEvent) {
    e.preventDefault();
    if (password === '' || username === '') {
      setError('Username and password are required');
      return;
    }
    const uppercaseCharacters = /[A-Z]/;
    const digit = /\d/;
    if (password.length < 7 || !uppercaseCharacters.test(password) || !digit.test(password)) {
      setError('Password does not meet requirements');
      return;
    };

    const createUser = async (username: string, password: string) => {
      try {
        const route = page === 'login'
          ? 'sign-in'
          : 'sign-up';
        const request = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        }
        const response = await fetch (`/api/auth/${route}`, request);
        if (response.status === 409) {
          setError('Username has already been taken');
          return;
        }
        if (response.status === 401) {
          setError('Invalid login');
          return;
        }
        setPassword('');
        setUsername('');
        const user = await response.json();
        signIn(user);
        navigate('/')
      } catch (err) {
        console.error(err);
      }
    }
    createUser(username, password);
  }

  const textRedirect = page === "login"
    ? "Need to register an account?"
    : "Already have an account?"

  const linkRedirect = page === "login"
    ? 'Sign Up'
    : 'Log In'

  const textButton = page === "login"
    ? "Log In"
    : "Register"

  const toLink = page === "login"
    ? "/register"
    : "/login"

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={10}>
          <h1 className="text-center my-4">My Todos</h1>
        </Col>
        <Col xs={8} md={7} lg={5}>
          <Card className="shadow-sm">
            <Card.Title>
              <h3 className=" mt-2 text-center">{textButton}</h3>
            </Card.Title>
            <Card.Body>
            <Form onSubmit={handleSubmit} id="loginForm">
              <Form.Label htmlFor="username" className="fs-5" >Username</Form.Label>
              <Form.Control required id="username" type="text" className="" onChange={handleChange} />
              <Form.Text className="d-block text-danger mb-4">{error}</Form.Text>
              <Form.Label htmlFor="password" className="fs-5" >Password</Form.Label>
              <Form.Control required type="password" id="password" className="" onChange={handleChange} />
              <Form.Text>Password must be at least 7 characters and include an uppercase letter and a digit </Form.Text>
              <Form.Text className="d-block text-danger mb-4">{error}</Form.Text>
              <div className="text-end">
                <Button type="submit" className="fs-5">{textButton}</Button>
              </div>
            </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={8}>
          <div className="text-center my-4">
            <h5>{textRedirect}</h5>
            <Link className="btn btn-link" to={toLink}>{linkRedirect}</Link>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
