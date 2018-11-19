/**
 *
 * BarCharts
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
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

/* eslint-disable react/prefer-stateless-function */
class BarCharts extends React.PureComponent {
  tickFormatter = (tick) => {
    const { range } = this.props;

    if (range.toUpperCase() === 'MONTH') {
      tick = moment(tick).format("MMM-YY"); 
    }

    return tick;
  };

  render() {
    const { data, range } = this.props;
    if (!data || data.length < 1) {
      return <div>Loading..</div>;
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
          formatter={(value) => (`${value} Applicants`)}
          cursor={false}
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
