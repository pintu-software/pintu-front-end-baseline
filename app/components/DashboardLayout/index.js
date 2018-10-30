/**
 *
 * NavBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import Logo from 'images/pintu-recruiter-logo-white.png';
import RefreshIcon from 'assets/common-images/refresh.svg';
import UserIcon from 'assets/common-images/user.svg';
import DropdownIcon from 'assets/common-images/dropdown.svg';
import DashboardIcon from 'assets/common-images/dashboard-white.svg';
import LearningIcon from 'assets/common-images/learning-white.svg';

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
  width: 180px;
  height: 60px;
`;

const LeftBarContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 60px;
  top: 62px;
  left: 0;
  bottom: 0;
  background-color: #2b2b34;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 959px) {
    top: 62px;
  }
`;

const NavIconContainer = styled.div`
  width: 60px;
  height: 60px;
  text-align: center;
  padding: 15px 0 15px 0;
  cursor: pointer;

  &:hover {
    background-color: #47474f;
  }

  background-color: ${({ active }) => (active ? '#47474f' : '#2b2b34')};
`;

const LeftBarSubContainer = styled.div`
  position: absolute;
  width: 186px;
  height: 100%;
  top: 62px;
  left: 60px;
  bottom: 0;
  background-color: #47474f;
  text-align: left;
  padding-top: 78px;

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

const UserIconStyled = styled.img`
  width: 24px;
  height: 24px;
`;

const DropdownIconStyled = styled.img`
  width: 15px;
  height: 15px;
  margin-left: 2px;
`;

const RefreshIconContainer = styled.div`
  text-align: center;
  cursor: pointer;
`;

const RefreshStyled = styled.img`
  width: 17px;
  height: 17px;
`;

const DashboardIconStyled = styled.img`
  width: 27px;
  height: 27px;
`;

const LearningIconStyled = styled.img`
  width: 27px;
  height: 27px;
`;

const MenuContainer = styled.div`
  width: 186px;
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

  showEquities = () => {
    // this.setState({
    //   showEquities: true,
    // });
  };

  goToExplore = () => {
    const { history } = this.props;
    history.push('/equities/explore');
  };

  goToWatchlist = () => {
    const { history } = this.props;
    history.push('/equities/watchlist');
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

    let displayName = 'Loading..';
    if (user) {
      const {
        FullUserName
      } = user;

      displayName = FullUserName;
    }

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
                <UserIconStyled src={UserIcon} alt="user" />
                <p>{displayName}</p>
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
        <LeftBarContainer>
          <NavIconContainer
            active={url.includes('equities')}
            onClick={this.showEquities}
          >
            <DashboardIconStyled src={DashboardIcon} alt="dashboard" />
          </NavIconContainer>
          <NavIconContainer>
            <LearningIconStyled src={LearningIcon} alt="learning" />
          </NavIconContainer>
        </LeftBarContainer>
        <LeftBarSubContainer>
          <LeftBarSubTitle>Recruitment</LeftBarSubTitle>
          <MenuContainer active={url.includes('explore')} onClick={this.goToExplore}>
            Overview
          </MenuContainer>
          <MenuContainer
            active={url.includes('watchlist')}
            onClick={this.goToWatchlist}
          >
            Watchlist
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
