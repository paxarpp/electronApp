import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const ListTheme = ({ subreddit, headerNews, handler }) => (
  <div>
    {
      subreddit.length !== 0
        ? subreddit.map((title) => {
          const active = headerNews.id === title.data.id;
          return (
            <ButtonWrapper
              key={title.data.id}
              onClick={!active ? () => handler(title.data) : null}
              active={active}
            >
              {title.data.display_name}
            </ButtonWrapper>
          );
        })
        : '...loading'
    }
  </div>
);
ListTheme.propTypes = {
  subreddit: PropTypes.arrayOf(PropTypes.shape).isRequired,
  headerNews: PropTypes.shape().isRequired,
  handler: PropTypes.func.isRequired,
};

const isActive = ({ active }) => active && css`
  background-color: #d4d4d4;
  border: 1px solid #d4d4d4;
`;

const hover = ({ active }) => !active && css`
    :hover {
    background-color: grey;
    color: #fff;
    cursor: pointer;
  }
`;

const ButtonWrapper = styled.div`
  display: inline-block;
  height: 16px;
  width: 50px;
  border-radius:8px;
  border: 1px solid grey;
  font-size: 12px;
  line-height: 12px;
  margin: 1px;
  transition: all 0.2s;
  padding: 1px 4px;
  overflow: hidden;
  ${isActive};
  ${hover};
`;

export default ListTheme;
