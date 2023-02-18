import React from 'react';
import Home from './pages/home';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/navigation-bar';
import LoginPage from './pages/accounts';
import { addUser } from './redux/auth-slice';
import { useDispatch, useSelector } from 'react-redux';

type User = {
  userId: number,
  username: string
}

export default function App () {
  const dispatch = useDispatch();
  const user = useSelector((state: User) => state.username);

  const handleSignIn = (result: { user:{ userId: number, username: string}, token:string }) => {
    const { user, token } = result;
    console.log('result', result);
    console.log(user);
    window.localStorage.setItem('todo-jwt', token);
    dispatch(addUser(user));
  }

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
