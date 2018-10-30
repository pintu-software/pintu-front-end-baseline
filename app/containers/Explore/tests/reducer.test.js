import { fromJS } from 'immutable';
import exploreReducer from '../reducer';

describe('exploreReducer', () => {
  it('returns the initial state', () => {
    expect(exploreReducer(undefined, {})).toEqual(fromJS({}));
  });
});
