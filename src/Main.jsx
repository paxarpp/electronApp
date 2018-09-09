import React, { Component } from 'react';
import axios from 'axios';

import HeaderNews from './components/headerNews';
import ListTheme from './components/listTheme';
import Post from './components/post';

const electron = window.require('electron');

const { ipcRenderer } = electron;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      subreddit: [],
      headerNews: {
        title: null,
        id: null,
      },
    };
    this.baseURL = 'https://old.reddit.com/';
    this.choiseHead = this.choiseHead.bind(this);
  }

  componentDidMount() {
    const listsTitleNews = 'subreddits.json';
    axios.get(`${this.baseURL}${listsTitleNews}`)
      .then(response => this.setState({ subreddit: response.data.data.children }))
      .catch(err => console.log(err));
  }

  choiseHead(data) {
    const head = data.display_name;
    const { id } = data;
    const headerNews = { id, title: head };
    const request = `r/${head}.json`;
    axios.get(`${this.baseURL}${request}`)
      .then(response => this.setState({
        posts: response.data.data.children,
        headerNews,
      }))
      .catch(err => console.log(err));
  }

  showImage(image) {
    ipcRenderer.send('toggle-image', image);
  }

  render() {
    const { posts, subreddit, headerNews } = this.state;
    return (
      <div>
        <HeaderNews headerNews={headerNews} />

        <ListTheme headerNews={headerNews} subreddit={subreddit} handler={this.choiseHead} />

        {
          posts.length !== 0 ? posts.map(post => (
            <Post key={post.data.id} post={post} onClick={this.showImage} />
          )) : <div>...loading</div>
        }
      </div>
    );
  }
}

export default Main;