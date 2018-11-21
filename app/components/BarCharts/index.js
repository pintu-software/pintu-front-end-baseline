/**
 *
 * BarCharts
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import moment from 'moment';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const axisTickStyle = {
  fontSize: '14px',
  fontWeight: 'normal',
  fill: '#ffffff',
  lineHeight: 1.3,
  letterSpacing: 'normal',
};

const tooltipItemStyle = {
  color: '#fff',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0',
};

const TooltipContainer = styled.div`
  background-color: #26272c !important;
  color: #fff !important;
  border-radius: 2px !important;
  padding: 1px 12px;
  border: 0 !important;
  font-family: 'ProximaNovaRegular', sans-serif !important;
  font-size: 14px !important;
`;

const TooltipItem = styled.p`
  font-size: 14px;
  font-weight: '500';
  color: #fff;
  margin: '0';
`;

/* eslint-disable react/prefer-stateless-function */
class BarCharts extends React.PureComponent {
  tickFormatter = (tick) => {
    const { range } = this.props;

    if (range === 1 || range === 3) {
      tick = moment(tick).format("Do MMM"); 
    } else if (range === 2 || range === 4) {
      tick = moment(tick).format("MMM"); 
    }

    return tick;
  };

  renderTooltip = (props) => {    
    const { active } = props;
    if (active) {
      const { payload } = props;
      return (
        <TooltipContainer>
          <TooltipItem>{`${payload[0].value} Applicants`}</TooltipItem>
        </TooltipContainer>
      );
    }

    return null;
  };

  render() {
    const { data, range } = this.props;
    if (!data || data.length < 1) {
      return <div>No data found.</div>;
    }

    return (
      <BarChart width={1100} height={320} data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 16 }}>
        <XAxis
          dataKey="name"
          tickLine={false}
          tick={axisTickStyle}
          tickMargin={20}
          axisLine={{ stroke: '#ffffff' }}
          tickFormatter={(tick) => this.tickFormatter(tick)}
        />
        <YAxis
          tickLine={false}
          tick={axisTickStyle}
          axisLine={{ stroke: '#ffffff' }}
          ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
        />
        <Tooltip
          itemStyle={tooltipItemStyle}
          wrapperClassName={'tooltip-wrapper'}
          // formatter={(value, name, props) => {
          //   console.log('formatter', value, name, props);
          //   return `Total: ${value} Applicants`;
          // }}
          labelFormatter={(value) => {
            if (range === 1 || range === 3) {
              return moment(value).format("Do MMM"); 
            }

            if (range === 2 || range === 4) {
              return moment(value).format("MMMM"); 
            }
           }}
          cursor={false}
          content={(props) => this.renderTooltip(props)}
        />
        {/* <Legend verticalAlign="top" wrapperStyle={{ color: '#ffffff' }} /> */}
        <Bar
          dataKey="value"
          fill="#ffbc12"
          barSize={50}
          label={{ position: 'top', fill: '#dddddd', fontSize: 10, fontWeight: 'normal', letterSpacing: 'normal' }}
        />
        {/* <Bar
          dataKey="Developer"
          fill="#ffe7b9"
          barSize={50}
          label={{ position: 'top', fill: '#dddddd', fontSize: 10, fontWeight: 'normal', letterSpacing: 'normal' }}
        /> */}
      </BarChart>
    );
  }
}

BarCharts.propTypes = {
  data: PropTypes.array,
  range: PropTypes.string,
};

export default BarCharts;
