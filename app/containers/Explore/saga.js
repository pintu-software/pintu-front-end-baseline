import { takeLatest, call, put } from 'redux-saga/effects';
import { post } from 'utils/api';
import applicants from 'assets/sample-data/applicants.json';
import { GET_ALL_APPLICANTS } from './constants';
import { getAllApplicantsSuccess, getAllApplicantsFailed } from './actions';

function* requestAllApplicants(action) {
  try {
    // const url = `url`;
    // const response = yield call(post, url, action.payload);
    yield put(getAllApplicantsSuccess(applicants));
  } catch (error) {
    yield put(getAllApplicantsFailed(error));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(GET_ALL_APPLICANTS, requestAllApplicants);
}
