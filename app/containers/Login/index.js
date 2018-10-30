/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import LogoImg from 'images/pintu-recruiter-logo-purple.png';
import { Grid, Paper, TextField, Hidden } from '@material-ui/core';
import Button from 'components/Button';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';

const MainContainer = styled(Grid)`
  padding-top: 130px;
`;

const LogoContainer = styled.div`
  margin-bottom: 28px;
`;

const LogoImgStyled = styled.img`
  width: 200px;
  height: auto;
`;

const TextFieldStyled = styled(TextField)`
  margin-bottom: 20px !important;
  min-width: 280px !important;
`;

const LinkStyled = styled(Link)`
  font-size: 14px;
  text-decoration: none;
  color: #000000;
`;

const PaperStyled = styled(Paper)`
  padding: 50px;
`;

export class Login extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberPassword: false,
      showPassword: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleLogin = () => {
    alert('login')
  }

  render() {
    const { email, password } = this.state;
    return (
      <MainContainer container justify="center" alignItems="center">
        <Hidden smDown>
          <PaperStyled>
            <Grid container direction="column" justify="center" alignItems="center">
              <LogoContainer>
                <LogoImgStyled src={LogoImg} alt="recruiter-logo" />
              </LogoContainer>
              <TextFieldStyled
                label="Email"
                type="email"
                value={email}
                onChange={this.handleChange('email')}
              />
              <TextFieldStyled
                label="Password"
                type="password"
                value={password}
                onChange={this.handleChange('password')}
              />
              <br />
              <Button type="primary" onClick={this.handleLogin}>Login</Button>
              <br />
              <LinkStyled to="/">Forgot Password?</LinkStyled>
            </Grid>
          </PaperStyled>
        </Hidden>
        <Hidden mdUp>
          <Grid container direction="column" justify="center" alignItems="center">
            <LogoContainer>
              <LogoImgStyled src={LogoImg} alt="recruiter-logo" />
            </LogoContainer>
            <TextFieldStyled
              label="Email"
              type="email"
              value={email}
              onChange={this.handleChange('email')}
            />
            <TextFieldStyled
              label="Password"
              type="password"
              value={password}
              onChange={this.handleChange('password')}
            />
            <Button type="primary">Login</Button>
            <LinkStyled to="/">Forgot Password?</LinkStyled>
          </Grid>
        </Hidden>
      </MainContainer>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Login);
