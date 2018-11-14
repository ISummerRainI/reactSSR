import { AppContainer } from 'react-hot-loader';

import React from 'react';
import ReactDom from 'react-dom';
import App from './App/index';


const root = document.getElementById('root')
const render = (Component) => {
  ReactDom.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    root
  )
}

render(App);
if (module.hot) {
  module.hot.accept(() => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App/index.js').default;
    render(NextApp);
  });
}
