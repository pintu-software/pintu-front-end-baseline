import { createSelector } from 'reselect';

const selectRoute = state => state.route;

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.location);


const selectApp = state => state.app;

const makeSelectUser = () =>
  createSelector(selectApp, substate => substate.user);

export { makeSelectLocation, makeSelectUser };
