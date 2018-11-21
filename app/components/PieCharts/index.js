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
  renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }

  render() {
    const { data } = this.props;
    if (!data || data.length < 1) {
      return <div>No data found.</div>;
    }

    return (
      <PieChart width={400} height={320}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx={260}
          cy={160}
          innerRadius={60}
          outerRadius={120}
          strokeWidth={0}
          // label={this.renderCustomizedLabel}
        >
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
