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
    totalPages: 1,
    page: 1,
    pageSize: 1,
    totalRecords: 1,
    status: 'All', 
    job: 'All', 
    sorted: 'Highest',
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
          totalPages: 1,
          page: 1,
          pageSize: 1,
          totalRecords: 1,
        },
      };
    case GET_ALL_APPLICANTS_SUCCESS:
      const {
        payload: {
          data,
          totalPages,
          page,
          pageSize,
          totalRecords,
          job,
          status,
          sorted
        }
      } = action;
      return {
        ...state,
        allApplicants: {
          loading: false,
          // data: action.payload,
          data,
          totalPages,
          page,
          pageSize,
          totalRecords,
          status, 
          job, 
          sorted
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
