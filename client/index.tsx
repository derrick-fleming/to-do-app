import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { Provider } from 'react-redux';
import store from './redux/generate-store';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/scroll-top';

const container = document.querySelector('#root');
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>
);
