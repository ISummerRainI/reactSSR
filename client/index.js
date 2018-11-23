import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import React from 'react';
import ReactDom from 'react-dom';
import App from 'views/App';
import AppState from './store/app_state';

const initialState = window.__INITIAL__STATE__ || {};

const root = document.getElementById('root')
const render = (Component) => {
  ReactDom.hydrate(
    <AppContainer>
      <Provider appState={new AppState(initialState.appState)}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root
  )
}

render(App);
if (module.hot) {
  module.hot.accept(() => {
    // eslint-disable-next-line global-require
    const NextApp = require('views/App').default;
    render(NextApp);
  });
}
