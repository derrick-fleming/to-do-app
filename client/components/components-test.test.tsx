import React from 'react';
import renderer from 'react-test-renderer';
import TodoForm from './todo-form';
import TodoList from './todo-list';
import { TodoItem } from './todo-list';
import { Provider } from 'react-redux';
import store from '../redux/generate-store';

it('renders TodoList correctly', () => {
  const tree = renderer
    .create(<Provider store={store}><TodoList /></Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders TodoForm correctly', () => {
  const tree = renderer
    .create(<Provider store={store}><TodoForm /></Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders TodoItem correctly', () => {
  const component = renderer.create(<Provider store={store}><TodoItem key='1' todo={{ todoId: '1', task: 'Complete work', isCompleted: false }} /></Provider>)
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
