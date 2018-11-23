import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  observer,
  inject,
} from 'mobx-react';

@inject('appState') @observer
class Detail extends Component {
  componentDidMount() {
    // do Something
  }

  changeName = (e) => {
    const {
      appState,
    } = this.props;
    appState.changeName(e.target.value);
  }

  render() {
    const {
      appState: { count, name },
    } = this.props;
    return (
      <div>
        <div>
          this is Detail Page
          <br />
          {name}
          <br />
          {count}
        </div>
        <Link to="/">to List</Link>
        <input type="text" onChange={this.changeName} />
      </div>
    )
  }
}
export default Detail;
