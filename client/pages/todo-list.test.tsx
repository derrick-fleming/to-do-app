import React from 'react';
import renderer from 'react-test-renderer';
import App from '../app';
import TodoForm from '../components/todo-form';
import TodoList from '../components/todo-list';
import Home from './home';
import { Provider } from 'react-redux';
import store from '../redux/generate-store';

it ('renders App correctly', ()=> {
  const tree = renderer
    .create(<Provider store={store}><App /></Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot;
});

it ('renders Home correctly', () => {
  const tree = renderer
    .create(<Provider store={store}><Home /></Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot;
});

it('renders TodoList correctly', () => {
  const tree = renderer
    .create(<Provider store={store}><TodoList /></Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot;
});

it('renders TodoForm correctly', () => {
  const tree = renderer
    .create(<Provider store={store}><TodoForm /></Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot;
});
