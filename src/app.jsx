import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axios.get("https://reddit.com/r/aww.json")
      .then(res => this.setState({posts: res.data.data.children}))
      .catch(err => console.log(err));
  }

  render() {
    return (<div>
      <h2>Welcome to React!</h2>
    </div>);
  }
}
