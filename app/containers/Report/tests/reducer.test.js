import { fromJS } from 'immutable';
import reportReducer from '../reducer';

describe('reportReducer', () => {
  it('returns the initial state', () => {
    expect(reportReducer(undefined, {})).toEqual(fromJS({}));
  });
});
