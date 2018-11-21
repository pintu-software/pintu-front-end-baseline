/**
 *
 * Report
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import moment from 'moment';

import allApplicants from 'assets/sample-data/applicants.json';
import { Grid } from '@material-ui/core';
import DashboardLayout from 'components/DashboardLayout';
import Dropdown from 'components/Dropdown';
import Loading from 'components/Loading';
import BarChart from 'components/BarCharts';
import PieChart from 'components/PieCharts';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectReport from './selectors';
import reducer from './reducer';
import saga from './saga';

const TitleRow = styled.div`
  width: 100vw;
  max-width: 1125px;
  display: flex;
  justify-content: space-between;
  // align-items: center;
  margin-bottom: 30px;

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

const FilterBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

const ContentRow = styled.div`
  width: 100vw;
  max-width: 1194px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 3em;
  background-color: #47474f;
  padding: 30px;
`;

const BarChartContainer = styled.div`
  padding-bottom: 4em;
  margin-bottom: 2em;
  border-bottom: solid 1px #26272c;
`;

const Table = styled.table`
  width: 80%;

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
    font-size: 12px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.3;
    letter-spacing: normal;
    color: #dddddd;
    text-transform: uppercase;
  }
`;

/* eslint-disable react/prefer-stateless-function */
export class Report extends React.PureComponent {
  state = {
    job: 'All',
    status: 'All',
    range: 2,
  };

  dropdownFilterChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  resetFilter = () => {
    alert('Reset');
  };

  getBarDataBasedOnRange = () => {
    const { range } = this.state;

    let data = allApplicants;
    if (range === 1) {
      data = _
        .chain(allApplicants)
        .sortBy(x => x.created_date)
        .filter(x => moment(x.created_date).month() === 2)
        .groupBy(x => x.created_date)
        .map((value, key) => {
          return {
            name: key,
            value: value.length,
          };
        })
        .value();
    }

    if (range === 2) {
      data = _
        .chain(allApplicants)
        .sortBy(x => x.created_date)
        .filter(x => moment(x.created_date).year() === moment().year())
        .groupBy(x => x.created_date.substring(0, 7))
        .map((value, key) => {
          return {
            name: key,
            value: value.length,
          };
        })
        .value();
    }

    if (range === 3) {
      data = _
        .chain(allApplicants)
        .sortBy(x => x.created_date)
        .groupBy(x => x.created_date.substring(0, 7))
        .map((value, key) => {
          return {
            name: key,
            value: value.length,
          };
        })
        .value();
    }

    if (range === 4) {
      data = _
        .chain(allApplicants)
        .sortBy(x => x.created_date)
        .filter(x => moment(x.created_date).year() === (moment().year() - 1))
        .groupBy(x => x.created_date.substring(0, 7))
        .map((value, key) => {
          return {
            name: key,
            value: value.length,
          };
        })
        .value();
    }

    return data;
  };

  getPieDataBasedOnRange = () => {
    const { range } = this.state;

    let data = allApplicants;
    if (range === 1) {
      data = _
        .chain(allApplicants)
        .sortBy(x => x.created_date)
        .filter(x => moment(x.created_date).month() === 2)
        .groupBy(x => x.job_title)
        .map((value, key) => {
          return {
            name: key,
            value: value.length,
          };
        })
        .value();
    }

    if (range === 2) {
      data = _
        .chain(allApplicants)
        .sortBy(x => x.created_date)
        .filter(x => moment(x.created_date).year() === moment().year())
        .groupBy(x => x.job_title)
        .map((value, key) => {
          return {
            name: key,
            value: value.length,
          };
        })
        .value();
    }

    if (range === 3) {
      data = _
        .chain(allApplicants)
        .sortBy(x => x.created_date)
        .groupBy(x => x.job_title)
        .map((value, key) => {
          return {
            name: key,
            value: value.length,
          };
        })
        .value();
    }

    if (range === 4) {
      data = _
        .chain(allApplicants)
        .sortBy(x => x.created_date)
        .filter(x => moment(x.created_date).year() === (moment().year() - 1))
        .groupBy(x => x.job_title)
        .map((value, key) => {
          return {
            name: key,
            value: value.length,
          };
        })
        .value();
    }

    return data;
  };

  render() {
    const { history, match } = this.props;
    const { range } = this.state;

    const ranges = [
      // {
      //   "label": "This Month",
      //   "value": 1
      // },
      {
        "label": "2018",
        "value": 2
      },
      // {
      //   "label": "Last Month",
      //   "value": 3
      // },
      {
        "label": "2017",
        "value": 4
      }
    ];

    const selectedRange = ranges.find(item => item.value === range);
    const barData = this.getBarDataBasedOnRange();
    const pieData = this.getPieDataBasedOnRange();

    return (
      <DashboardLayout history={history} match={match}>
        <TitleRow>
          <Title>Report</Title>
        </TitleRow>
        <ContentRow>
          <FilterBoxContainer>
            <Dropdown
              type="primary"
              items={ranges}
              placeholder={range}
              name="range"
              value={range}
              onChange={this.dropdownFilterChange}
            />
          </FilterBoxContainer>
          <BarChartContainer>
            <BarChart data={barData} range={range} />
          </BarChartContainer>
          <Grid item xs={12} md={6}>
            <PieChart data={pieData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Table>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Total of Applicants</th>
                </tr>
              </thead>
              <tbody>
                {pieData.map(x => (
                  <tr key={x.id}>
                    <td>{x.name}</td>
                    <td>{x.value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Grid>
        </ContentRow>
      </DashboardLayout>
    );
  }
}

Report.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  report: makeSelectReport(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'report', reducer });
const withSaga = injectSaga({ key: 'report', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Report);
