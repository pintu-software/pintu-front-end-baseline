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
  color: #ffffff;
  margin: 0;
  text-decoration: underline;
  margin-left: 3px;
`;

const ContentRow = styled.div`
  width: 100vw;
  // max-width: 1125px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Table = styled.table`
  width: 100%;

  tr {
    padding: 8px;
    border-top: solid 1.5px #26272c;
    border-bottom: solid 1.5px #26272c;
    background-color: #353540;

    &:nth-child(even) {
      // background-color: #3d3d42;
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
    background-color: #26272c;
    font-size: 14px;
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

const Text = styled.p`
  color: #dddddd;
  font-size: 20px;
`;

/* eslint-disable react/prefer-stateless-function */
export class Explore extends React.PureComponent {
  state = {
    job: 'All',
    status: 'All',
    sorted: 'highest',
    currentApplicants: [],
    currentPage: 1,
    pageLimit: 10,
    totalPages: null,
  };

  componentWillMount() {
    this._handleQueryStringParameters();
  }

  componentDidUpdate(prevProps, prevState) {
    this._handleQueryStringParameters(prevProps);
  }

  _handleQueryStringParameters = (prevProps, prevState) => {
    if (this.props.applicants.loading) {
      return;
    }

    const filterParameters = this._getQueryStringParameters();

    const {
      status,
      job,
      sorted,
      page,
    } = filterParameters;

    if (!prevProps) {
      return this.props.getAllApplicants({
        status,
        job,
        sorted,
        page,
        pageSize: this.state.pageLimit,
      });
    }

    const {
      applicants,
    } = this.props;

    let changeDetected = false;
    const updatePaylod = _.cloneDeep(filterParameters);
    const keys = Object.keys(filterParameters);

    keys.forEach(x => {
      if (!_.isEqual(filterParameters[x], applicants[x])) {
        changeDetected = true;
        updatePaylod[x] = filterParameters[x];
      }
    })

    if (!changeDetected) {
      return;
    }


    return this.props.getAllApplicants({
      ...updatePaylod,
      pageSize: this.state.pageLimit,
    });


  }

  _getQueryStringParameters() {
    const payload = {
      status: 'All',
      job: 'All',
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
    const { status, job, sorted } = this.props.applicants;
    const { currentPage } = data;

    this.manageFilterChanges({
      status,
      job,
      sorted,
      page: currentPage,
    });
  };

  dropdownFilterChange = (name, value) => {
    const { status, job, sorted } = this.props.applicants;

    const updatedStatus = name === 'status' ? value : status;
    const updatedJob = name === 'job' ? value : job;

    this.manageFilterChanges({
      status: updatedStatus,
      job: updatedJob,
      sorted,
      page: 1,
    });
  };

  manageFilterChanges = (filters) => {
    const currentPath = this.props.match.path;
    const pathSansQueryString = _.chain(currentPath.split('?')).first().value();

    if (!filters) {
      return this.props.history.push(pathSansQueryString);
    }

    const {
      status,
      job,
      sorted,
      page,
    } = filters;

    const parameters = [];

    if (status) {
      parameters.push(`status=${status}`);
    }

    if (job) {
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
    const { status, job, currentPage } = this.state;

    this.setState({
      sorted: sortBy,
    }, () => {
      this.manageFilterChanges({
        status,
        job,
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

    if (this.props.applicants.loading) {
      return (
        <DashboardLayout history={history} match={match}>
          <Loading />
        </DashboardLayout>
      );
    }

    if (this.props.applicants.data.length === 0) {
      return (
        <DashboardLayout history={history} match={match}>
          <Text>No data found.</Text>
        </DashboardLayout>
      );
    }

    const {
      applicants: {
        data,
        totalPages,
        page,
        pageSize,
        totalRecords,
        status,
        job,
        sorted,
      },
    } = this.props;

    const allApplicants = data;

    const totalApplicants = allApplicants.length;

    return (
      <DashboardLayout history={history} match={match}>
        <SearchBarRow>
          <Title>Overview</Title>
          <SearchBox />
        </SearchBarRow>
        <FilterSortRow container alignItems="center">
          <Grid item xs={12} md={5}>
            <Label>Filter by</Label>
            <FilterBoxContainer>
              <Dropdown
                type="primary"
                items={statuses}
                selectedItem={status}
                placeholder={status ? status : 'Status'}
                name="status"
                onChange={this.dropdownFilterChange}
              />
              <Dropdown
                type="primary"
                items={jobs}
                selectedItem={job}
                placeholder={job ? job : 'Job'}
                name="job"
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
                  sorted={sorted}
                  onClick={() => this.sortByRank('lowest')}
                >
                  Highest Rank
                </Button>
              )}
              {sorted === 'lowest' && (
                <Button
                  type="sortbyLowest"
                  sorted={sorted}
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
        <ContentRow>
          <Table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Rank</th>
                <th>Status</th>
                <th>Job Applied</th>
              </tr>
            </thead>
            <tbody>
              {allApplicants.map(applicant => (
                <tr key={applicant.id}>
                  <td>{applicant.full_name}</td>
                  <td>{applicant.email}</td>
                  <td>{applicant.phone}</td>
                  <td>{applicant.rank}</td>
                  <td>{applicant.status}</td>
                  <td>{applicant.job_title}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ContentRow>
        <PaginationRow>
          <Pagination
            totalRecords={totalRecords}
            pageLimit={pageSize}
            currentPage={page}
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
