import React from 'react';
import renderer from 'react-test-renderer';
import TodoForm from './todo-form';
import TodoList from './todo-list';
import TodoItem from './todo-item';
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
  const component = renderer.create(<Provider store={store}><TodoItem key='1' todo={{ todoId: 1, task: 'Complete work', isCompleted: false, updatedAt: "2023-02-21T23:36:30.721Z", createdAt: "2023-02 - 21T23: 36: 30.721Z" }} filter={false} sort='recent' /></Provider>)
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
