/**
 *
 * PieCharts
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';

const colors = [
  '#0088fe',
  '#00c49f',
  '#ffbb28',
  '#ff8042',
  '#711ac1',
];

const tooltipItemStyle = {
  color: '#fff',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0',
};

/* eslint-disable react/prefer-stateless-function */
class PieCharts extends React.PureComponent {
  render() {
    const { data } = this.props;
    if (!data || data.length < 1) {
      return <div>No data found.</div>;
    }

    return (
      <PieChart width={500} height={360}>
        <Pie data={data} cx={250} cy={180} innerRadius={60} outerRadius={120}>
          {data.map(({ name }, index) => (
            <Cell
              key={name}
              fill={colors[index]}
            />
          ))}
        </Pie>
        <Tooltip
          itemStyle={tooltipItemStyle}
          wrapperClassName={'tooltip-wrapper'}
          formatter={(value) => (`${value} Applicants`)}
          cursor={false}
        />
      </PieChart>
    );
  }
}

PieCharts.propTypes = {
  data: PropTypes.array,
};

export default PieCharts;
