import { createSelector } from 'reselect';

/**
 * Direct selector to the report state domain
 */

const selectReportDomain = state =>
  state.report;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Report
 */

const makeSelectReport = () =>
  createSelector(selectReportDomain, substate => substate);

export default makeSelectReport;
export { selectReportDomain };
