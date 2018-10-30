/**
 *
 * Loading
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // height: 100vh;
  // width: 100vw;
  padding: 20% 45%;

  @media (max-width: 1279px) {
    padding: 20% 35%;
  }
`;

const Item = styled.div`
  width: 100px;
  text-align: center;
`;

const Text = styled.p`
  font-size: 14px;
  text-transform: uppercase;
  color: #ffbc12;
`;

function Loading() {
  return (
    <Container>
      <Item>
        <CircularProgress style={{ color: '#ffbc12' }} />
      </Item>
      {/* <Text>Loading..</Text> */}
    </Container>
  );
}

Loading.propTypes = {};

export default Loading;
