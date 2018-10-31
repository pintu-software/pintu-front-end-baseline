import { takeLatest, call, put } from 'redux-saga/effects';
import { post } from 'utils/api';
import _ from 'lodash';
import applicants from 'assets/sample-data/applicants.json';
import { GET_ALL_APPLICANTS } from './constants';
import { getAllApplicantsSuccess, getAllApplicantsFailed } from './actions';

function* requestAllApplicants(action) {
  try {
    const { status, job, sorted } = action.payload;
    console.log('payload', action);
    
    // let returnPayload = applicants.filter(x => {
    //   const clauses = [];

    //   if (status.toUpperCase().trim() !== 'ALL') {
    //     clauses.push('x.status === status');
    //   }

    //   return eval(clauses.join('&&'));
    // });
    let returnPayload = applicants
    let data = _.chain(applicants);

    if (status.toUpperCase().trim() !== 'ALL') {
      data = data.filter(x => x.status === status);
    }

    if (job.toUpperCase().trim() !== 'ALL') {
      data = data.filter(x => x.job_title === job);
    }

    if (sorted.toUpperCase().trim() === 'HIGHEST') {
      data = data.orderBy(x => x.rank);
    }

    if (sorted.toUpperCase().trim() === 'LOWEST') {
      data = data.orderBy(x => x.rank).reverse();
    }

    returnPayload = data.value();

    yield put(getAllApplicantsSuccess(returnPayload));
  } catch (error) {
    yield put(getAllApplicantsFailed(error));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(GET_ALL_APPLICANTS, requestAllApplicants);
}
