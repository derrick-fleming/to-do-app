import React, { useEffect } from 'react';
import Home from './pages/home';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NavigationBar from './components/navigation-bar';
import LoginPage from './pages/accounts';
import { addUser } from './redux/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

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
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<LoginPage page="signup" signIn={handleSignIn}/>} />
        <Route path="/login" element={<LoginPage page="login" signIn={handleSignIn}/>} />
        </Routes>
      </>
    );
}
