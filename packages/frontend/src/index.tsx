import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Loading from './pages/Loading';

const LazyApp = lazy(() => import('./App'));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Suspense fallback={<Loading />}>
    <Provider store={store}>
      <BrowserRouter>
        <LazyApp />
      </BrowserRouter>
    </Provider>
  </Suspense>,
);

serviceWorkerRegistration.register();

reportWebVitals();
