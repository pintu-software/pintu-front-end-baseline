/**
 *
 * SearchBox
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input } from '@material-ui/core';
import { Search } from '@material-ui/icons';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0;
  width: 331px;
  max-width: 331px;
  height: 40px;
  opacity: 0.98;
  border: solid 1px #dddddd;

  @media (max-width: 768px) {
    max-width: 200px;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #727272;
  padding-left: 10px;
`;

const InputStyled = styled(Input)`
  color: #dddddd !important;
  width: 100%;
  padding-left: 30px;
`;

/* eslint-disable react/prefer-stateless-function */
class SearchBox extends React.PureComponent {
  render() {
    return (
      <Container>
        <IconContainer>
          <Search />
        </IconContainer>
        <InputStyled placeholder="Search by Keyword" disableUnderline />
      </Container>
    );
  }
}

SearchBox.propTypes = {};

export default SearchBox;
