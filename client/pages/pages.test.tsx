import Home from '../pages/home';
import { Provider } from 'react-redux';
import store from '../redux/generate-store';
import React from 'react';
import renderer from 'react-test-renderer';

it('renders Home correctly', () => {
  const tree = renderer
    .create(<Provider store={store}><Home /></Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
