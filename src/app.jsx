import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    const baseURL = 'https://reddit.com/r/aww.json';
    axios.get(baseURL)
      .then(response => this.setState({ posts: response.data.data.children }))
      .catch(err => console.log(err));
  }

  render() {
    const { posts } = this.state;
    return (<div>
      <h2>Welcome to React!</h2>
      {posts.length !== 0 ? posts.map(post => (
        <div
          style={{ height: '60px' }}
        >
          <img
            alt="img post"
            src={post.data.preview.images[0].source.url}
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
            }}
          />
          {post.data.title}
        </div>
            )) : '...loading'}
    </div>);
  }
}
