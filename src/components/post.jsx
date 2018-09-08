import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Post = ({ post }) => (
  <Wrapper>
    {
      post.data.preview
        && (
        <Image
          alt="img post"
          src={post.data.preview.images[0].source.url}
        />
        )
    }
    {post.data.title}
  </Wrapper>
);
Post.propTypes = {
  post: PropTypes.shape().isRequired,

};

const Image = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const Wrapper = styled.div`
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

export default Post;
