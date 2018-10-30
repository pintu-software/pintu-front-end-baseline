/**
 *
 * ScbLineChart
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  LineChart,
  Line,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const tooltipItemStyle = {
  color: '#000000',
  fontSize: '14px',
  fontWeight: 'bold',
  lineHeight: 'normal',
  textAlign: 'center',
};

const axisTickStyle = {
  fontSize: '12px',
  fontWeight: 'normal',
  fill: '#a6a8ab',
  lineHeight: 1.42,
  letterSpacing: '0.1px',
};

/* eslint-disable react/prefer-stateless-function */
class ScbLineChart extends React.PureComponent {
  render() {
    const data = [
      { name: '15 FEB', uv: 112, pv: 50 },
      { name: '13 MAR', uv: 150, pv: 140 },
      { name: '14 APR', uv: 110, pv: 123 },
      { name: '16 MAY', uv: 123, pv: 140 },
      { name: '17 JUN', uv: 189, pv: 90 },
      { name: '17 JUL', uv: 114.5, pv: 70 },
    ];
    return (
      <div>
        <LineChart
          width={600}
          height={350}
          data={data}
          syncId="anyId"
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            axisLine={{ stroke: '#6d6e71' }}
            tick={axisTickStyle}
            tickMargin={7}
            tickLine={false}
            dataKey="name"
          />
          <YAxis
            axisLine={false}
            tick={axisTickStyle}
            tickMargin={5}
            tickLine={false}
            ticks={[0, 50, 100, 150, 200]}
            tickFormatter={(tick) => (`US$${tick}`)}
            interval={0}
          />
          <Tooltip itemStyle={tooltipItemStyle} />
          <Line type='monotone' dataKey='pv' stroke='#ffbc12' fill='#ffbc12' />
          <Brush width={515} height={42} stroke="#ffbc12" />
        </LineChart>
      </div>
    );
  }
}

ScbLineChart.propTypes = {};

export default ScbLineChart;
