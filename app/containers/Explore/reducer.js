/*
 *
 * Explore reducer
 *
 */

import {
  GET_ALL_APPLICANTS,
  GET_ALL_APPLICANTS_SUCCESS,
  GET_ALL_APPLICANTS_FAILED,
} from './constants';

const initialState = {
  allApplicants: {
    loading: false,
    error: null,
    data: [],
  },
};

function exploreReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_APPLICANTS:
      return {
        ...state,
        allApplicants: {
          loading: true,
          data: [],
        },
      };
    case GET_ALL_APPLICANTS_SUCCESS:
      return {
        ...state,
        allApplicants: {
          loading: false,
          data: action.payload,
        },
      };
    case GET_ALL_APPLICANTS_FAILED:
      return {
        ...state,
        allApplicants: {
          loading: false,
          error: action.error,
        },
      };
    default:
      return state;
  }
}

export default exploreReducer;
