import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';

import {
  observer,
  inject,
} from 'mobx-react';

import Helmet from 'react-helmet'

@inject('appState') @observer

class List extends Component {
  componentDidMount() {
    // do Something
  }

  bootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.changeCount(3);
        resolve(true);
      })
    })
  }

  render() {
    const {
      appState: { count },
    } = this.props;
    return (
      <div>
        <Helmet>
          <title>List Page</title>
          <meta name="description" content="this is list Page" />
        </Helmet>
        {count}
        <div>this is List Page</div>
        <Link to="/detail">to Detail</Link>
      </div>
    )
  }
}

export default List;
