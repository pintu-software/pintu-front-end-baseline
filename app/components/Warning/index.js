/**
 *
 * Loading
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import WarningIcon from '@material-ui/icons/Warning';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const Item = styled.div`
  width: 100px;
  text-align: center;
`;

const Text = styled.p`
  font-size: 16px;
  color: #ffbc12;
`;

function Warning(props) {
  let warningText = '';

  if (props.text) {
    const {
      text,
    } = props;

    warningText = text;
  }

  return (
    <Container>
      <Item>
        <WarningIcon style={{ color: '#ffbc12' }} />
      </Item>
      <Text>{warningText}</Text>
    </Container>
  );
}

Warning.propTypes = {
  text: PropTypes.string,
};

export default Warning;
