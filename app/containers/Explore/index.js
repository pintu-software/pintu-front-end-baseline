/**
 *
 * Explore
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';

import { Grid } from '@material-ui/core';
import jobs from 'assets/sample-data/jobs.json';
import statuses from 'assets/sample-data/job-statuses.json';
import ResetIcon from 'assets/common-images/reset.svg';
import DashboardLayout from 'components/DashboardLayout';
import SearchBox from 'components/SearchBox';
import Dropdown from 'components/Dropdown';
import Button from 'components/Button';
import Pagination from 'components/Pagination';
import Loading from 'components/Loading';
import SelectedFilter from 'components/SelectedFilter';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectAllApplicants } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getAllApplicants } from './actions';

const SearchBarRow = styled.div`
  width: 100vw;
  max-width: 1125px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    max-width: 475px;
  }
`;

const Title = styled.p`
  width: 89px;
  height: 26px;
  font-family: 'ProximaNovaBold', sans-serif;
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.3;
  letter-spacing: 0.1px;
  color: #dddddd;
  text-transform: uppercase;
`;

const FilterSortRow = styled(Grid)`
  width: 100vw;
  max-width: 1125px;
`;

const FilterBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
`;

const Label = styled.p`
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #dddddd;
  text-transform: uppercase;
`;

const Divider = styled.div`
  border-left: solid 1px #26272c;
  height: 70px;
  margin-left: 120px;
  margin-right: 26px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ResetFilterRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  max-width: 1125px;
  margin-bottom: 18px;
`;

const ResetIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  width: 100px;
`;

const ResetIconStyled = styled.img`
  height: 24px;
  width: 24px;
`;

const ResetText = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: 0.1px;
  text-align: right;
  color: #ffbc12;
  margin: 0;
  text-decoration: underline;
  margin-left: 3px;
`;

const SelectedFilterRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  max-width: 1125px;
  margin-bottom: 18px;
`;

const CardRow = styled.div`
  width: 100vw;
  // max-width: 1125px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Table = styled.table`
  width: 100%;

  tr {
    padding: 8px;
    background-color: #56565b;

    &:nth-child(even) {
      background-color: #3d3d42;
    }
  }

  td {
    padding: 10px 20px;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.42;
    letter-spacing: normal;
    color: #dddddd;
  }

  th {
    padding: 10px 20px;
    text-align: left;
    background-color: #6d6e71;
    font-size: 10px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.3;
    letter-spacing: normal;
    color: #dddddd;
    text-transform: uppercase;
  }
`;

const PaginationRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 39px;
  margin-bottom: 57px;
  width: 1125px;
  justify-content: center;
`;

/* eslint-disable react/prefer-stateless-function */
export class Explore extends React.PureComponent {
  state = {
    jobArray: [],
    statusArray: [],
    sorted: 'highest',
    currentApplicants: [],
    currentPage: 1,
    totalPages: null,
    allApplicants: [],
  };

  componentWillMount() {
    this._handleQueryStringParameters();
  }

  componentDidUpdate(prevProps, prevState) {
    this._handleQueryStringParameters();
  }

  _handleQueryStringParameters = () => {
    if (this.props.applicants.loading) {
      return;
    }

    const filterParameters = this._getQueryStringParameters();
    const filterParameterKeys = Object.keys(filterParameters);
    const keysToUpdate = [];

    for (let i = 0; i < filterParameterKeys.length; i++) {
      const filterParameterKey = filterParameterKeys[i];
      const filterParameter = filterParameters[filterParameterKey];
      const stateParameter = this.state[filterParameterKey];

      const isSame = _.isEqual(filterParameter, stateParameter);

      if (isSame) {
        continue;
      }

      keysToUpdate.push(filterParameterKey);
    }

    if (keysToUpdate.length < 1 && this.props.applicants.data.length > 0) {
      return;
    } else if (keysToUpdate.length < 1 && this.props.applicants.data.length < 1) {
      return this.props.getAllApplicants({
        statusArray: [],
        jobArray: [],
      });
    }

    const stateUpdatePayload = {};

    for (let i = 0; i < keysToUpdate.length; i++) {
      const keyToUpdate = keysToUpdate[i];
      stateUpdatePayload[keyToUpdate] = filterParameters[keyToUpdate];
    }

    this.setState(stateUpdatePayload, () => {
      const {
        statusArray,
        jobArray,
        sorted,
      } = this.state;

      this.props.getAllApplicants({
        statusArray,
        jobArray,
        sorted,
      });
    });
  }

  _getQueryStringParameters() {
    const payload = {
      statusArray: [],
      sorted: 'highest',
      page: 1,
    };

    const queryStringSegment = window.location.search;

    if (!queryStringSegment || typeof queryStringSegment !== 'string' || queryStringSegment.trim() === '') {
      return payload;
    }

    const queryStringSegmentLength = queryStringSegment.length;
    const rawParameters = queryStringSegment.substr(1, queryStringSegmentLength).trim();
    const parameters = rawParameters.split('&');

    if (!parameters || !Array.isArray(parameters) || parameters.length < 1) {
      return payload;
    }

    const numberOfParameters = parameters.length;
    const payloadKeys = Object.keys(payload);

    for (let i = 0; i < numberOfParameters; i++) {
      const parameter = parameters[i];
      const parameterValues = parameter.split('=');
      const key = parameterValues[0];
      let value = decodeURIComponent(parameterValues[1]);

      if (!value || typeof value !== 'string' || value.trim() === '') {
        continue;
      };

      const targetKey = payloadKeys.find(x => x.indexOf(key) > -1);

      if (targetKey.toUpperCase().indexOf('ARRAY') > -1) {
        value = value.split(',');
      }

      if (targetKey.toUpperCase() === 'PAGE') {
        value = Number(value);
      }

      payload[targetKey] = value;
    }

    return payload;
  }

  onPageChanged = data => {
    const allApplicants = this.props.applicants.data;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentApplicants = allApplicants.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentApplicants, totalPages }, () => {
      const { statusArray, jobArray, sorted } = this.state;
      this.manageFilterChanges({
        statusArray,
        jobArray,
        sorted,
        page: currentPage,
      });
    });
  };

  dropdownFilterChange = (name, value) => {
    const { statusArray, jobArray, currentPage } = this.state;

    let updatedStatusArray = _.clone(statusArray);
    if (name === 'statusArray') {
      const selected = _.filter(statusArray, x => x === value);
      if (selected.length > 0) {
        updatedStatusArray = _.filter(statusArray, x => x !== value);
      } else {
        updatedStatusArray.push(value);
      }
    }

    let updatedJobArray = _.clone(jobArray);
    if (name === 'jobArray') {
      const selected = _.filter(jobArray, x => x === value);
      if (selected.length > 0) {
        updatedJobArray = _.filter(jobArray, x => x !== value);
      } else {
        updatedJobArray.push(value);
      }
    }

    this.manageFilterChanges({
      statusArray: updatedStatusArray,
      jobArray: updatedJobArray,
      sorted,
      page: currentPage,
    });
  };

  removeFilter = (name, filter) => {
    const { statusArray, sorted, currentPage } = this.state;

    let updatedStatusArray = _.clone(statusArray);
    if (name === 'statusArray') {
      updatedStatusArray = _.filter(statusArray, x => x !== filter);
    }

    let updatedJobArray = _.clone(jobArray);
    if (name === 'jobArray') {
      updatedJobArray = _.filter(jobArray, x => x !== filter);
    }

    this.manageFilterChanges({
      statusArray: updatedStatusArray,
      jobArray: updatedJobArray,
      sorted,
      page: currentPage,
    });
  };

  manageFilterChanges = (filters) => {
    const currentPath = this.props.match.path;
    const pathSansQueryString = _.chain(currentPath.split('?')).first().value();

    if (!filters) {
      return this.props.history.push(pathSansQueryString);
    }

    const {
      statusArray,
      jobArray,
      sorted,
      page,
    } = filters;

    const status = statusArray.join(',');
    const job = jobArray.join(',');

    const parameters = [];

    if (status.length > 0) {
      parameters.push(`status=${status}`);
    }

    if (job.length > 0) {
      parameters.push(`job=${job}`);
    }

    if (sorted.toUpperCase() === 'HIGHEST' || sorted.toUpperCase() === 'LOWEST') {
      parameters.push(`sorted=${sorted}`);
    }

    if (Number(page)) {
      parameters.push(`page=${page}`);
    }

    const newPath = `${pathSansQueryString}?${parameters.join('&')}`;

    this.props.history.push(newPath);
  };

  sortByRank = sortBy => {
    const { statusArray, jobArray, currentPage } = this.state;

    this.setState({
      sorted: sortBy,
    }, () => {
      this.manageFilterChanges({
        statusArray,
        jobArray,
        sorted: sortBy,
        page: currentPage,
      });
    });
  };

  resetFilter = () => {
    this.manageFilterChanges();
  };

  goToCardDetails = id => {
    this.props.history.push(`/applicant/${id}`);
  };

  render() {
    const { history, match } = this.props;
    const {
      statusArray,
      jobArray,
      currentApplicants,
      currentPage,
      totalPages,
      sorted,
    } = this.state;

    if (
      this.props.applicants.loading ||
      this.props.applicants.data.length < 1
    ) {
      return (
        <DashboardLayout history={history} match={match}>
          <Loading />
        </DashboardLayout>
      );
    }

    const allApplicants = this.props.applicants.data;

    const totalApplicants = allApplicants.length;

    return (
      <DashboardLayout history={history} match={match}>
        <SearchBarRow>
          <Title>Recruitment</Title>
          <SearchBox />
        </SearchBarRow>
        <FilterSortRow container alignItems="center">
          <Grid item xs={12} md={5}>
            <Label>Filter by</Label>
            <FilterBoxContainer>
              <Dropdown
                type="secondary"
                items={statuses}
                selectedArr={statusArray}
                placeholder="Status"
                name="statusArray"
                onChange={this.dropdownFilterChange}
              />
              <Dropdown
                type="secondary"
                items={jobs}
                selectedArr={jobArray}
                placeholder="Job"
                name="jobArray"
                onChange={this.dropdownFilterChange}
              />
            </FilterBoxContainer>
          </Grid>
          <Divider />
          <Grid item xs={12} md={5}>
            <Label>Sort by</Label>
            <FilterBoxContainer>
              {sorted === 'highest' && (
                <Button
                  type="sortbyHighest"
                  sorted={this.state.sorted}
                  onClick={() => this.sortByRank('lowest')}
                >
                  Highest Rank
                </Button>
              )}
              {sorted === 'lowest' && (
                <Button
                  type="sortbyLowest"
                  sorted={this.state.sorted}
                  onClick={() => this.sortByRank('highest')}
                >
                  Lowest Rank
                </Button>
              )}
            </FilterBoxContainer>
          </Grid>
        </FilterSortRow>
        <ResetFilterRow>
          <ResetIconContainer onClick={this.resetFilter}>
            <ResetIconStyled src={ResetIcon} alt="reset" />
            <ResetText>Reset Filter</ResetText>
          </ResetIconContainer>
        </ResetFilterRow>
        <SelectedFilterRow>
          {statusArray.map(seletedFilter => (
            <SelectedFilter
              seletedFilter={seletedFilter}
              onClick={() => this.removeFilter('statusArray', seletedFilter)}
            />
          ))}
        </SelectedFilterRow>
        <CardRow>
          <Table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Linkedin URL</th>
                <th>Rank</th>
                <th>Status</th>
                <th>Job Applied</th>
              </tr>
            </thead>
            <tbody>
              {currentApplicants.map(applicant => (
                <tr key={applicant.id}>
                  <td>{applicant.full_name}</td>
                  <td>{applicant.email}</td>
                  <td>{applicant.phone}</td>
                  <td>{applicant.linkedin_url}</td>
                  <td>{applicant.rank}</td>
                  <td>{applicant.status}</td>
                  <td>{applicant.job_title}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardRow>
        <PaginationRow>
          <Pagination
            totalRecords={totalApplicants}
            pageLimit={16}
            currentPage={currentPage}
            onPageChanged={this.onPageChanged}
          />
        </PaginationRow>
      </DashboardLayout>
    );
  }
}

Explore.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  applicants: PropTypes.object,
  getAllApplicants: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  applicants: makeSelectAllApplicants(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllApplicants: payload => dispatch(getAllApplicants(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'explore', reducer });
const withSaga = injectSaga({ key: 'explore', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Explore);
