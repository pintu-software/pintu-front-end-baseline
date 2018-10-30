/**
 *
 * Button
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CheckboxIcon from 'assets/common-images/checkbox.svg';
import CheckmarkIcon from 'assets/common-images/checkmark.svg';
import ArrowUpIcon from 'assets/common-images/arrow-up.svg';
import ArrowUpYellowIcon from 'assets/common-images/arrow-up-yellow.svg';
import ArrowDownIcon from 'assets/common-images/arrow-down.svg';
import ArrowDownYellowIcon from 'assets/common-images/arrow-down-yellow.svg';

const BaseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  text-transform: uppercase;
  text-align: center;
  color: #26272c;
  // margin-right: 20px;

  @media (max-width: 599px) {
    margin-right: 0;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const PrimaryButton = BaseButton.extend`
  min-width: ${({ small }) => (small ? '93px' : '104px')};
  height: ${({ small }) => (small ? '38px' : '44px')};
  border-radius: 2px;
  background-color: #ffbc12;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #ffac12;
  }

  &:active {
    background-color: #ef9b00;
  }

  &:disabled {
    background-color: #999999;
  }
`;

const SecondaryButton = BaseButton.extend`
  min-width: ${({ small }) => (small ? '93px' : '150px')};
  height: ${({ small }) => (small ? '38px' : '40px')};
  border-radius: 2px;
  border: solid 1px #ffbc12;
  color: #ffbc12;

  &:hover {
    background-color: #fff7e6;
  }

  &:active {
    background-color: #ffe7b9;
  }

  &:disabled {
    border: solid 1px #6f6f6f;
    color: #6f6f6f;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const SortingButtonHighest = BaseButton.extend`
  min-width: 130px;
  height: 40px;
  border: solid 1px #ffbc12;
  color: ${({ sorted }) => (sorted === 'highest' ? '#000000' : '#ffbc12')}
  background-color: ${({ sorted }) => (sorted === 'highest' ? '#ffbc12' : '')};
  font-size: 14px;
  text-transform: none;
  margin-right: 0;
  cursor: auto;
`;

const SortingButtonLowest = BaseButton.extend`
  min-width: 130px;
  height: 40px;
  border: solid 1px #ffbc12;
  color: ${({ sorted }) => (sorted === 'lowest' ? '#000000' : '#ffbc12')}
  background-color: ${({ sorted }) => (sorted === 'lowest' ? '#ffbc12' : '')};
  font-size: 14px;
  text-transform: none;
  margin-right: 0;
  cursor: auto;
`;

const SecondarySortingButton = BaseButton.extend`
  min-width: 40px;
  height: 40px;
  opacity: 0.8;
  border: solid 1px #ffbc12;
  margin-right: 0;
`;

const SortingLabelHighest = styled.div`
  flex: 1;
  align-items: center;
  font-size: 14px;
  text-transform: none;
  color: ${({ sorted }) =>
    sorted === 'highest' ? '#00000 !important' : '#ffbc12'};
`;

const SortingLabelLowest = styled.div`
  flex: 1;
  align-items: center;
  font-size: 14px;
  text-transform: none;
  color: ${({ sorted }) =>
    sorted === 'lowest' ? '#00000 !important' : '#ffbc12'};
`;

const CheckboxButton = BaseButton.extend`
  min-width: 144px;
  height: 40px;
  border-radius: 2px;
  border: solid 1px #ffbc12;
  color: ${({ checked }) => (checked ? '#000000' : '#ffbc12')}
  background-color: ${({ checked }) => (checked ? '#ffbc12' : '')};
  font-size: 14px;
  text-transform: none;
  margin-right: 20px;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const CheckIconStyled = styled.img`
  height: 14px;
  width: 14px;
`;

const CheckboxLabel = styled.div`
  flex: 1;
  align-items: center;
  font-size: 14px;
  text-transform: none;
  color: ${({ checked }) => (checked ? '#00000 !important' : '#ffbc12')};
`;

const CtaButton = BaseButton.extend`
  min-width: 254px;
  min-height: 40px;
  border-radius: 2px;
  background-color: #ffbc12;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  margin-right: 0;

  &:hover {
    background-color: #ffac12;
  }

  &:active {
    background-color: #ef9b00;
  }

  &:disabled {
    background-color: #ffe2ab;
  }
`;

/* eslint-disable react/prefer-stateless-function */
class Button extends React.PureComponent {
  render() {
    const { props } = this;
    const { type, checked, children, onClick, sorted } = this.props;

    switch (type) {
      case 'primary':
        return <PrimaryButton {...props} />;
      case 'secondary':
        return <SecondaryButton {...props} />;
      case 'sortbyHighest':
        return (
          <Container sorted={sorted}>
            <SortingButtonHighest sorted={sorted}>
              <LabelContainer>
                <CheckIconStyled
                  src={sorted === 'highest' ? ArrowUpIcon : ArrowUpYellowIcon}
                  alt="arrow"
                />
                <SortingLabelHighest sorted={sorted}>
                  {children}
                </SortingLabelHighest>
              </LabelContainer>
            </SortingButtonHighest>
            <SecondarySortingButton onClick={onClick}>
              <CheckIconStyled
                src={sorted === 'highest' ? ArrowDownYellowIcon : ArrowDownIcon}
                alt="arrow"
              />
            </SecondarySortingButton>
          </Container>
        );
      case 'sortbyLowest':
        return (
          <Container sorted={sorted}>
            <SecondarySortingButton onClick={onClick}>
              <CheckIconStyled
                src={sorted === 'lowest' ? ArrowUpYellowIcon : ArrowUpIcon}
                alt="arrow"
              />
            </SecondarySortingButton>
            <SortingButtonLowest sorted={sorted}>
              <LabelContainer>
                <SortingLabelLowest sorted={sorted}>
                  {children}
                </SortingLabelLowest>
                <CheckIconStyled
                  src={
                    sorted === 'lowest' ? ArrowDownIcon : ArrowDownYellowIcon
                  }
                  alt="arrow"
                />
              </LabelContainer>
            </SortingButtonLowest>
          </Container>
        );
      case 'checkbox':
        return (
          <CheckboxButton checked={checked} onClick={onClick}>
            <LabelContainer>
              <CheckIconStyled
                src={checked ? CheckmarkIcon : CheckboxIcon}
                alt="checkbox"
              />
              <CheckboxLabel checked={checked}>{children}</CheckboxLabel>
            </LabelContainer>
          </CheckboxButton>
        );
      case 'cta':
        return <CtaButton {...props} />;
      default:
        return <BaseButton {...props} />;
    }
  }
}

Button.propTypes = {
  type: PropTypes.oneOf([
    'primary',
    'secondary',
    'sortbyHighest',
    'sortbyLowest',
    'checkbox',
    'cta',
  ]),
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  children: PropTypes.node,
  onClick: PropTypes.func,
  sorted: PropTypes.string,
};

Button.defaultProps = {
  checked: false,
  sorted: 'highest',
};

export default Button;
