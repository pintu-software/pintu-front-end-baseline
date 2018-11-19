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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 3em;
  background-color: #47474f;
  padding: 30px;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentTitle = styled.p`
  font-size: 20px;
  // font-weight: bold;
  letter-spacing: 0.3px;
`;

const ContentText = styled.p`
  margin: 0;
`;

/* eslint-disable react/prefer-stateless-function */
export class Report extends React.PureComponent {
  state = {
    job: 'All',
    status: 'All',
    range: 'Month',
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
    if (range.toUpperCase() === 'MONTH') {
      data = _
        .chain(allApplicants)
        .sortBy(x => x.created_date)
        .groupBy(x => x.created_date.substring(0, 7))
        .map((value, key) => {
          // const intern = value.filter(x => x.job_title.toUpperCase() === 'INTERN');
          // const developer = value.filter(x => x.job_title.toUpperCase() === 'DEVELOPER');

          return {
            name: key,
            value: value.length,
          };
        })
        .value();
    } else if (range.toUpperCase() === 'YEAR') {
      data = _
        .chain(allApplicants)
        .sortBy(x => x.created_date)
        .groupBy(x => x.created_date.substring(0, 4))
        .map((value, key) => {
          // const intern = value.filter(x => x.job_title.toUpperCase() === 'INTERN');
          // const developer = value.filter(x => x.job_title.toUpperCase() === 'DEVELOPER');

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
    if (range.toUpperCase() === 'MONTH') {
      data = _
        .chain(allApplicants)
        .sortBy(x => x.created_date)
        .groupBy(x => x.job_title)
        .map((value, key) => {
          // const intern = value.filter(x => x.job_title.toUpperCase() === 'INTERN');
          // const developer = value.filter(x => x.job_title.toUpperCase() === 'DEVELOPER');

          return {
            name: key,
            value: value.length,
          };
        })
        .value();
    } else if (range.toUpperCase() === 'YEAR') {
      data = _
        .chain(allApplicants)
        .sortBy(x => x.created_date)
        .groupBy(x => x.job_title)
        .map((value, key) => {
          // const intern = value.filter(x => x.job_title.toUpperCase() === 'INTERN');
          // const developer = value.filter(x => x.job_title.toUpperCase() === 'DEVELOPER');

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
      {
        "label": "Month",
        "value": "Month"
      },
      {
        "label": "Year",
        "value": "Year"
      }
    ];

    const barData = this.getBarDataBasedOnRange();
    const pieData = this.getPieDataBasedOnRange();
    console.log('pie', pieData);

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
              selectedItem={range}
              placeholder={range}
              name="range"
              onChange={this.dropdownFilterChange}
            />
          </FilterBoxContainer>
          <BarChart data={barData} range={range} />
        </ContentRow>
        <ContentRow>
          <Grid item xs={12} md={6}>
            <PieChart data={pieData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextContent>
              <ContentTitle>{`Total applicants for ${range} :`}</ContentTitle>
              {pieData.map(x => (
                <ContentText>{x.name} - {x.value} Applicants</ContentText>
              ))}
            </TextContent>
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
