import React, { Component } from 'react';
import styled from 'styled-components';

const electron = window.require('electron');
const { ipcRenderer } = electron;

class ImageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
    };
  }

  componentDidMount() {
    ipcRenderer.on('image', (event, arg) => this.setState({ imageUrl: arg }));
  }

  render() {
    const { imageUrl } = this.state;
    return (
      <div>
        <Image src={imageUrl} alt="img" />
      </div>
    );
  }
}

const Image = styled.img`
  width: 100%;
`;

export default ImageView;
