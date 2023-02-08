import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';
import { Provider } from 'react-redux';
import store from './redux/generate-store';

it('renders App correctly', () => {
  const tree = renderer
    .create(<Provider store={store}><App /></Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
