/**
 *
 * SelectedFilter
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RemoveIcon from 'assets/common-images/remove.svg';

const Container = styled.div`
  min-width: 101px;
  height: 28px;
  border-radius: 14px;
  border: solid 1px #979797;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 6px 4px 6px 12px;
  align-items: center;
  margin-right: 13px;
  cursor: pointer;
`;

const Text = styled.p`
  font-size: 12px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #dddddd;
  margin: 0;
`;

const RemoveIconStyled = styled.img`
  height: 20px;
  width: 20px;
`;

/* eslint-disable react/prefer-stateless-function */
class SelectedFilter extends React.PureComponent {
  render() {
    const { seletedFilter, onClick } = this.props;
    return (
      <Container onClick={onClick}>
        <Text>{seletedFilter}</Text>
        <RemoveIconStyled src={RemoveIcon} alt="remove" />
      </Container>
    );
  }
}

SelectedFilter.propTypes = {
  seletedFilter: PropTypes.string,
  onClick: PropTypes.func,
};

export default SelectedFilter;
