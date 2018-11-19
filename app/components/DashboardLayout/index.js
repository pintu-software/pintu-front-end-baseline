/**
 *
 * NavBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Logo from 'images/pintu-logo-white.png';
import DropdownIcon from 'assets/common-images/caret.svg';
import Person from '@material-ui/icons/Person';

import {
  AppBar,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Popover,
  Toolbar,
  Grid,
} from '@material-ui/core';

const MainContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

const AppBarStyled = styled(AppBar)`
  max-height: 60px;
  background-color: #26272c !important;
  box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, 0.1);

  @media (max-width: 959px) {
    min-height: 60px;
  }
`;

const Container = styled(Grid)`
  margin-left: 277px;
  margin-top: 30px;
  max-width: 1194px;
`;

const LogoStyled = styled.img`
  width: 80px;
  height: 40px;
`;

const LeftBarSubContainer = styled.div`
  position: absolute;
  width: 226px;
  height: 100%;
  top: 62px;
  left: 0;
  bottom: 0;
  background-color: #47474f;
  text-align: left;
  padding-top: 30px;

  @media (max-width: 959px) {
    top: 62px;
  }
`;

const LeftBarSubTitle = styled.p`
  // width: 89px;
  // height: 26px;
  font-family: 'ProximaNovaBold', sans-serif;
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.3;
  letter-spacing: 0.1px;
  color: #dddddd;
  text-transform: uppercase;
  margin-left: 13px;
`;

const DropdownIconStyled = styled.img`
  width: 15px;
  height: 15px;
  margin-left: 8px;
`;

const MenuContainer = styled.div`
  width: 226px;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;

  &:hover {
    background-color: #26272c;
    color: #ffbc12;
  }

  background-color: ${({ active }) => (active ? '#26272c' : '#4747f')};
  color: ${({ active }) => (active ? '#ffbc12' : '#ffffff')};
`;

/* eslint-disable react/prefer-stateless-function */
class DashboardLayout extends React.PureComponent {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  refreshPage = () => {
    alert('refresh');
  };

  goToExplore = () => {
    const { history } = this.props;
    history.push('/');
  };

  goToReport = () => {
    const { history } = this.props;
    history.push('/report');
  };

  componentWillUnmount() {
    window.clearInterval(this.timeIntervalDelegate);
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const {
      children,
      match: { url },
      user,
    } = this.props;

    return (
      <MainContainer>
        <AppBarStyled position="static">
          <Toolbar>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              spacing={16}
            >
              <LogoStyled src={Logo} alt="logo" />
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <IconButton
                aria-owns={open ? 'nav-popper' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <Person style={{ color: '#ffffff' }} />
                <DropdownIconStyled src={DropdownIcon} alt="dropdown" />
              </IconButton>
              <Popover
                id="nav-popper"
                open={open}
                anchorEl={anchorEl}
                onClose={this.handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <List component="nav">
                  <ListItem button>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
                <Divider />
              </Popover>
            </Grid>
          </Toolbar>
        </AppBarStyled>
        <LeftBarSubContainer>
          <LeftBarSubTitle>Recruitment</LeftBarSubTitle>
          <MenuContainer active={url === '/'} onClick={this.goToExplore}>
            Overview
          </MenuContainer>
          <MenuContainer active={url === '/report'} onClick={this.goToReport}>
            Report
          </MenuContainer>
        </LeftBarSubContainer>
        <Container container>{children}</Container>
      </MainContainer>
    );
  }
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
  history: PropTypes.object,
  match: PropTypes.object,
  user: PropTypes.object,
};

export default DashboardLayout;
