import { takeLatest, call, put } from 'redux-saga/effects';
import { post } from 'utils/api';
import _ from 'lodash';
import applicants from 'assets/sample-data/applicants.json';
import { GET_ALL_APPLICANTS } from './constants';
import { getAllApplicantsSuccess, getAllApplicantsFailed } from './actions';

function* requestAllApplicants(action) {
  try {
    const { status, job, sorted, page, pageSize } = action.payload;

    let returnPayload = applicants;
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

    const offset = (page - 1) * pageSize;
    const totalRecords = returnPayload.length;
    const totalPages = Math.ceil(totalRecords / pageSize);
    returnPayload = returnPayload.slice(offset, offset + pageSize);

    yield put(getAllApplicantsSuccess({
      data: returnPayload,
      totalPages,
      page,
      pageSize,
      totalRecords,
      status, 
      job, 
      sorted,
    }));
  } catch (error) {
    yield put(getAllApplicantsFailed(error));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(GET_ALL_APPLICANTS, requestAllApplicants);
}
