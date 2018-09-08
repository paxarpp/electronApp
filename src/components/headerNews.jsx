import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HeaderNews = ({ headerNews = null }) => (
  <Wrapper>
    {
      headerNews.id
        ? <MainHeader>{headerNews.title}</MainHeader>
        : <MainHeader>Welcome to Reddit!</MainHeader>
    }
  </Wrapper>
);
HeaderNews.propTypes = {
  headerNews: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

const Wrapper = styled.div`
    text-align: center;
`;

const MainHeader = styled.h2`
    font-weight: 600;
`;
export default HeaderNews;
