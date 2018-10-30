/*
 *
 * App reducer
 *
 */

import {
  SAVE_EIKON_USER_INFO,
} from './constants';

const initialState = {
  user: {
    loading: false,
    error: null,
    data: {
      FullUserName: 'Testing',
    },
  },
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_EIKON_USER_INFO:
      return {
        ...state,
        user: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    default:
      return state;
  }
}

export default appReducer;
