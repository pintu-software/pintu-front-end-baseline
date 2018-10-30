/*
 *
 * Explore actions
 *
 */
import { GET_ALL_APPLICANTS, GET_ALL_APPLICANTS_SUCCESS, GET_ALL_APPLICANTS_FAILED } from './constants';

export function getAllApplicants(payload) {
  return {
    type: GET_ALL_APPLICANTS,
    payload,
  };
}

export function getAllApplicantsSuccess(payload) {
  return {
    type: GET_ALL_APPLICANTS_SUCCESS,
    payload,
  };
}

export function getAllApplicantsFailed(payload) {
  return {
    type: GET_ALL_APPLICANTS_FAILED,
    payload,
  };
}
