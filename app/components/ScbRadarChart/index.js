/**
 *
 * ScbRadarChart
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Radar,
  RadarChart,
  PolarGrid,
  // Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 234px;
  height: 185px;
`;

/* eslint-disable react/prefer-stateless-function */
class ScbRadarChart extends React.PureComponent {
  render() {
    const { data, small } = this.props;

    if (small) {
      return (
        <Container>
          <RadarChart
            cx={120}
            cy={70}
            outerRadius={55}
            width={240}
            height={140}
            data={data}
          >
            <PolarGrid />
            <PolarAngleAxis
              dataKey="axis"
              tick={{ fill: '#6c6c6c', fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={90}
              tick={{ fill: '#a6a8ab', fontSize: 8 }}
            />
            <Radar
              name="Fund"
              dataKey="value"
              stroke="#ffbc12"
              fill="#ffbc12"
              fillOpacity={0.5}
            />
          </RadarChart>
        </Container>
      );
    }

    return (
      <Container>
        <RadarChart
          cx={200}
          cy={300}
          outerRadius={110}
          width={355}
          height={420}
          data={data}
        >
          <PolarGrid />
          <PolarAngleAxis
            dataKey="axis"
            tick={{ fill: '#6c6c6c', fontSize: 12 }}
          />
          <PolarRadiusAxis angle={90} tick={{ fill: '#a6a8ab', fontSize: 8 }} />
          <Radar
            name="Fund"
            dataKey="value"
            stroke="#ffbc12"
            fill="#ffbc12"
            fillOpacity={0.5}
          />
        </RadarChart>
      </Container>
    );
  }
}

ScbRadarChart.propTypes = {
  data: PropTypes.array,
  small: PropTypes.bool,
};

export default ScbRadarChart;
