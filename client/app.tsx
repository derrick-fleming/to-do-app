import React, { useEffect } from 'react';
import Home from './pages/home';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NavigationBar from './components/navigation-bar';
import LoginPage from './pages/accounts';
import { addUser } from './redux/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type User = {
  userId: number,
  username: string
}

export default function App () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = (result: { user:{ userId: number, username: string}, token:string }) => {
    const { user, token } = result;
    window.localStorage.setItem('todo-jwt', token);
    dispatch(addUser(user));
  }

  useEffect(() => {
    const token = window.localStorage.getItem('todo-jwt');
    const user: User = token ? jwtDecode(token) : null;
    if (user === null) {
      navigate('/login')
    } else {
      dispatch(addUser(user));
      navigate('/')
    }
  }, []);

  return (
      <>
        <NavigationBar/>
        <Container>
          <Row className="justify-content-center mt-4">
            <Col xs={10}className="clipboard">
              <Row className="justify-content-between flex-nowrap">
              <Col >
                <i className='clip ms-2 mt-2'></i>
                <i className='clip-top me-4'></i>
              </Col>
              <Col className='text-end'>
                <i className='clip me-2 mt-2'></i>
                <i className='clip-top me-2'></i>
              </Col>
              </Row>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<LoginPage page="signup" signIn={handleSignIn}/>} />
              <Route path="/login" element={<LoginPage page="login" signIn={handleSignIn}/>} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </>
    );
}
