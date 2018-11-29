/**
 *
 * Dropdown
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DropdownIcon from 'assets/common-images/dropdown.svg';
import CheckboxIcon from 'assets/common-images/checkbox-black.svg';
import CheckmarkIcon from 'assets/common-images/checkmark.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;

  @media (max-width: 599px) {
    margin-right: 0;
  }
`;

const DropdownContainer = styled.div`
  position: initial;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  width: 100%;
  align-items: center;
  min-width: 145px;
  height: 40px;
  opacity: 0.98;
  border: solid 1px #dddddd;
  color: #ffffff;
  display: flex;
  font-size: 14px;
  line-height: normal;
  justify-content: space-between;
  padding: 0 16px;
  transition: all 0.24s ease-in-out;

  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    border: 1px solid #ffbc12;
  }

  @media (max-width: 959px) {
    padding: 10px;
  }
`;

const DropdownIconStyled = styled.img`
  height: 14px;
  width: 14px;
`;

const Popover = styled.div`
  min-width: 145px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 1px;
  margin-top: 5px;
  max-height: 350px;
  overflow-y: auto;
  position: absolute;
  box-shadow: none;
  z-index: 1000;

  @media (max-width: 959px) {
    max-height: 250px;
  }
`;

const Item = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  text-align: inherit;
  color: #000;
  display: block;
  font-size: 14px;
  padding: ${({ type }) => (type === 'primary' ? '0 16px' : '0 11px')};
  width: 100%;
  min-height: 40px;

  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 959px) {
    padding: 15px;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CheckIconStyled = styled.img`
  height: 14px;
  width: 14px;
  margin-right: 9px;
`;

const CheckboxLabel = styled.div`
  flex: 1;
  align-items: center;
  font-size: 14px;
  text-transform: none;
  color: #00000;
`;

const Label = styled.span`
  color: #dddddd;
  text-transform: uppercase;
  font-size: 13px;
  margin-bottom: 2px;
`;

/* eslint-disable react/prefer-stateless-function */
class Dropdown extends React.PureComponent {
  state = {
    open: false,
  };

  handleButtonClick = () => {
    this.setState(
      ({ open }) => ({ open: !open }),
      () => {
        if (this.state.open) {
          document.addEventListener('click', this.handleOutsideClick);
        } else {
          document.removeEventListener('click', this.handleOutsideClick);
        }
      },
    );
  };

  handleOutsideClick = event => {
    if (this.popover && !this.popover.contains(event.target))
      this.handleButtonClick();
  };

  handleItemClick = (name, value) => {
    const { onChange } = this.props;

    if (onChange) onChange(name, value);

    this.handleButtonClick();
  };

  handleItemSelect = (name, value) => {
    const { onChange } = this.props;

    if (onChange) onChange(name, value);
  };

  render() {
    const { disabled, items, value, placeholder, name, type, selectedArr } = this.props;
    const { open } = this.state;

    const selectedItem = items.find(item => item.value === value);

    const popoverStyle = {};
    if (this.button) {
      popoverStyle.left = this.button.offsetLeft;
      popoverStyle.top = this.button.offsetTop + this.button.offsetHeight;
      popoverStyle.width = this.button.offsetWidth;
    }

    switch (type) {
      case 'primary':
        return (
          <Container>
            <Label>{name}</Label>
            <DropdownContainer>
              <Button
                disabled={disabled}
                innerRef={el => {
                  this.button = el;
                }}
                onClick={this.handleButtonClick}
              >
                {selectedItem ? selectedItem.label : placeholder}
                <DropdownIconStyled src={DropdownIcon} alt="dropdown" />
              </Button>
              {open && (
                <Popover
                  innerRef={el => {
                    this.popover = el;
                  }}
                  style={popoverStyle}
                >
                  {items.map(item => (
                    <Item
                      key={item.value}
                      onClick={() => {
                        this.handleItemClick(name, item.value);
                      }}
                    >
                      {item.label}
                    </Item>
                  ))}
                </Popover>
              )}
            </DropdownContainer>
          </Container>
        );
      case 'secondary':
        return (
          <Container>
            <DropdownContainer>
              <Button
                disabled={disabled}
                innerRef={el => {
                  this.button = el;
                }}
                onClick={this.handleButtonClick}
              >
                {placeholder}
                <DropdownIconStyled src={DropdownIcon} alt="dropdown" />
              </Button>
              {open && (
                <Popover
                  innerRef={el => {
                    this.popover = el;
                  }}
                  style={popoverStyle}
                >
                  {items.map(item => (
                    <Item
                      key={item.value}
                      onClick={() => {
                        this.handleItemSelect(name, item.value);
                      }}
                    >
                      <LabelContainer>
                        <CheckIconStyled
                          src={selectedArr.includes(item.value) ? CheckmarkIcon : CheckboxIcon}
                          alt="checkbox"
                        />
                        <CheckboxLabel value={value}>{item.label}</CheckboxLabel>
                      </LabelContainer>
                    </Item>
                  ))}
                </Popover>
              )}
            </DropdownContainer>
          </Container>
        );
      default:
        return <div>Dropdown type not specified.</div>
    }
  }
}

Dropdown.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary']),
  disabled: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  placeholder: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  selectedArr: PropTypes.array,
};

Dropdown.defaultProps = {
  disabled: false,
  placeholder: 'Please select',
};

export default Dropdown;
