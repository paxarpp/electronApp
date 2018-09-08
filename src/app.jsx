import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      subreddit: [],
      head: null
    };
    this.baseURL = 'https://old.reddit.com/';
  }

  componentDidMount() {
    const subreddit = 'subreddits.json';
    axios.get(this.baseURL + subreddit)
      .then(response => this.setState({ subreddit: response.data.data.children }))
      .catch(err => console.log(err));
  }

  choiseHead(head) {
    const awwURL = 'r/' + head + '.json';
    axios.get(this.baseURL + awwURL)
      .then(response => this.setState({ 
        posts: response.data.data.children,
        head
      }))
      .catch(err => console.log(err));
  }

  render() {
    const { posts, subreddit, head } = this.state;
    console.log(posts);
    console.log(subreddit);
    
    return (<div>
      {
        head ? <h2>{head}</h2> : <h2>Welcome to Reddit!</h2>
      }
      {subreddit.length !== 0 ? subreddit.map(head => (
        <Head
          key={head.data.id}
          onClick={this.choiseHead.bind(this, head.data.display_name)}
          >
          {head.data.display_name}
        </Head>
            )) : '...loading'}
      {posts.length !== 0 ? posts.map(post => (
        <Post key={post.data.id}>
          { 
            post.data.preview && 
            <Image
              alt="img post"
              src={post.data.preview.images[0].source.url}
          />
          }
          {post.data.title}
        </Post>
            )) : <div>{'...loading'}</div>}
    </div>);
  }
}

const Image = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const Post = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
  margin-bottom: 5px;
  transition: background 0.2s;
  :hover {
    cursor: pointer;
    background-color: #eee;
  }
`;

const Head = styled.button`
  height: 16px;
  font-size: 12px;
  line-height: 12px;
  margin: 1px;
`;

export default App;
