import { createSelector } from 'reselect';

/**
 * Direct selector to the explore state domain
 */

const selectExploreDomain = state => state.explore;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Explore
 */

const makeSelectAllApplicants = () =>
  createSelector(selectExploreDomain, substate => substate.allApplicants);


export { makeSelectAllApplicants };
