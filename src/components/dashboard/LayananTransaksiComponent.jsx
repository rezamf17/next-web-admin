// components/BarChart.js
import React, { useEffect, useRef } from 'react';
import { Layout } from "antd";
import * as echarts from 'echarts';
const { Content } = Layout;

const BarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    // Set the chart options
    const options = {
      title: {
        text: 'Sample Bar Chart',
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20, 30],
        },
      ],
    };

    // Use the options to set the chart
    chart.setOption(options);

    // Clean up the chart on component unmount
    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <Content className="layout-content">
      <div className="content-wrapper">
        <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
      </div>
    </Content>
  )
};

export default BarChart;
