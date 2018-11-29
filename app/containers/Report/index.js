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
import statuses from 'assets/sample-data/job-statuses.json';
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
  // margin-bottom: 30px;

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

const FilterRow = styled.div`
  width: 100vw;
  max-width: 1194px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 3em;
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
`;

const BarChartContainer = styled.div`
  padding-bottom: 4em;
  margin-bottom: 2em;
  border-bottom: solid 1px #26272c;
  min-width: 1194px;
  min-height: 400px;
`;

const Table = styled.table`
  width: 80%;

  tr {
    padding: 8px;
    // background-color: #56565b;
    border-bottom: solid 1px #56565b;

    &:nth-child(even) {
      // background-color: #3d3d42;
    }
  }

  td {
    padding: 16px;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.42;
    letter-spacing: normal;
    color: #ffffff;
  }

  th {
    padding: 16px;
    text-align: left;
    // background-color: #6d6e71;
    border-bottom: solid 1px #56565b;
    font-size: 12px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.3;
    letter-spacing: normal;
    // color: #ffffff;
    color: #ffbc12;
    text-transform: uppercase;
  }
`;

/* eslint-disable react/prefer-stateless-function */
export class Report extends React.PureComponent {
  state = {
    status: 'All',
    range: 1,
  };

  reportingData = [];

  constructor(props) {
    super(props);

    const rawData = _.chain(allApplicants)
      .map(x => {
        const item = _.cloneDeep(x);
        item.createdDate = moment(x.created_date, moment.ISO_8601);
        item.createYear = item.createdDate.year();

        return item;
      })
      .groupBy(x => x.createYear)
      .value();

    const years = _.chain(Object.keys(rawData)).map(x => Number(x)).sortBy(x => x).reverse().value();
    const numberOfyears = years.length;

    const currentYear = moment().year();

    for (let i = 0; i < numberOfyears; i++) {
      const newYear = currentYear - i;
      const targetyear = years[i];
      var entries = rawData[targetyear];

      entries.forEach(x => {
        const clonedItem = _.cloneDeep(x);
        clonedItem.createdDate = clonedItem.createdDate.year(newYear);
        clonedItem.createYear = newYear;
        clonedItem.created_date = clonedItem.createdDate.toISOString();
        this.reportingData.push(clonedItem);
      });
    }
  }

  dropdownFilterChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  resetFilter = () => {
    alert('Reset');
  };

  getBarDataBasedOnRange = () => {
    const { range, status } = this.state;

    let data = this.reportingData;

    if (status.toUpperCase() === 'ALL') {
      if (range === 1) {
        data = _
          .chain(data)
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

        return data;
      }

      if (range === 2) {
        data = _
          .chain(data)
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

        return data;
      }
    }

    if (range === 1) {
      data = _
        .chain(data)
        .sortBy(x => x.created_date)
        .filter(x => moment(x.created_date).year() === moment().year() && x.status === status)
        .groupBy(x => x.created_date.substring(0, 7))
        .map((value, key) => {
          return {
            name: key,
            value: value.length,
          };
        })
        .value();

      return data;
    }

    if (range === 2) {
      data = _
        .chain(data)
        .sortBy(x => x.created_date)
        .filter(x => moment(x.created_date).year() === (moment().year() - 1) && x.status === status)
        .groupBy(x => x.created_date.substring(0, 7))
        .map((value, key) => {
          return {
            name: key,
            value: value.length,
          };
        })
        .value();

      return data;
    }
  };

  getPieDataBasedOnRange = () => {
    const { range, status } = this.state;

    let data = this.reportingData;

    if (status.toUpperCase() === 'ALL') {
      if (range === 1) {
        data = _
          .chain(data)
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

        return data;
      }

      if (range === 2) {
        data = _
          .chain(data)
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

        return data;
      }
    }

    if (range === 1) {
      data = _
        .chain(data)
        .sortBy(x => x.created_date)
        .filter(x => moment(x.created_date).year() === moment().year() && x.status === status)
        .groupBy(x => x.job_title)
        .map((value, key) => {
          return {
            name: key,
            value: value.length,
          };
        })
        .value();

      return data;
    }

    if (range === 2) {
      data = _
        .chain(data)
        .sortBy(x => x.created_date)
        .filter(x => moment(x.created_date).year() === (moment().year() - 1) && x.status === status)
        .groupBy(x => x.job_title)
        .map((value, key) => {
          return {
            name: key,
            value: value.length,
          };
        })
        .value();

      return data;
    }
  };

  render() {
    const { history, match } = this.props;
    const { range, status } = this.state;

    const ranges = [
      {
        "label": "This Year",
        "value": 1
      },
      {
        "label": "Last Year",
        "value": 2
      },
    ];

    const barData = this.getBarDataBasedOnRange();
    const pieData = this.getPieDataBasedOnRange();

    return (
      <DashboardLayout history={history} match={match}>
        <TitleRow>
          <Title>Report</Title>
        </TitleRow>
        <FilterRow>
          <Label>Filter by</Label>
          <FilterBoxContainer>
            <Dropdown
              type="primary"
              items={ranges}
              placeholder={range}
              name="range"
              value={range}
              onChange={this.dropdownFilterChange}
            />
            <Dropdown
              type="primary"
              items={statuses}
              selectedItem={status}
              placeholder={status ? status : 'Status'}
              name="status"
              onChange={this.dropdownFilterChange}
            />
          </FilterBoxContainer>
        </FilterRow>
        <ContentRow>
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
                  <tr>
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
