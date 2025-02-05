import AppHeight from 'hooks/app-height';
import './styles/bootstrap.scss';
import './index.module.scss';

import AppRoutes from './router/config';
import React from 'react';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <Router>
          <AppRoutes />
          <AppHeight />
        </Router>
      </HelmetProvider>
    </Provider>
  </React.StrictMode >
);