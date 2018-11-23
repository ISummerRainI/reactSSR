import React, { Component } from 'react';
import axios from 'axios';

export default class TestApi extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  getTopics = () => {
    axios.get('api/topics').then((res) => {
      console.log(res.data);
    }).catch((e) => {
      console.log(e);
    })
  }

  login = () => {
    axios.post('api/user/login', {
      accessToken: 'd76cd9a8-c4f2-464f-807f-664c993513a6',
    }).then((res) => {
      console.log(res.data);
    }).catch((e) => {
      console.log(e);
    })
  }

  markAll = () => {
    axios.post('api/message/mark_all?needAccessToken=true').then((res) => {
      console.log(res.data);
    }).catch((e) => {
      console.log(e);
    })
  }

  render = () => {
    return (
      <div>
        <button type="button" onClick={this.getTopics}>Topics</button>
        <button type="button" onClick={this.login}>Login</button>
        <button type="button" onClick={this.markAll}>MarkAll</button>
      </div>
    )
  }
}
