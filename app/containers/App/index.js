/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Login from 'containers/Login/Loadable';
import Explore from 'containers/Explore/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Loading from 'components/Loading';
import Warning from 'components/Warning';
import injectReducer from 'utils/injectReducer';
import { makeSelectUser } from './selectors';
import reducer from './reducer';

// eslint-disable-next-line react/prefer-stateless-function
export class App extends React.Component {
  constructor() {
    super();
  }

  componentDidUpdate(prevProps) {
    const { location, user } = this.props;
    const { pathname } = location;
    const { location: prevLocation } = prevProps;
    const { pathname: prevPathname } = prevLocation;

    if (pathname !== prevPathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    // if (!this.props.user || !this.props.user.data) {
    //   return <Loading />;
    // }

    return (
      <Switch>
        <Route exact path="/login" name="login" component={Login} />
        <Route exact path="/" name="overview" component={Explore} />
        <Route path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    );
  }
}

App.propTypes = {
  location: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'app', reducer });

export default withRouter(compose(withReducer, withConnect)(App));

// export default withRouter(App);
