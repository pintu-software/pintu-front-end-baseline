import { createSelector } from 'reselect';

/**
 * Direct selector to the login state domain
 */

const selectLoginDomain = state => state.login;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Login
 */

const makeSelectLogin = () =>
  createSelector(selectLoginDomain, substate => substate);

export default makeSelectLogin;
export { selectLoginDomain };
