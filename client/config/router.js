import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

import List from 'views/List';
import Detail from 'views/Detail';
import TestApi from 'views/TestApi';

export default () => [
  <Route path="/" key="index" render={() => <Redirect to="/list" />} exact />,
  <Route path="/list" key="list" component={List} />,
  <Route path="/detail" key="detail" component={Detail} />,
  <Route path="/test" key="test" component={TestApi} />,
]
