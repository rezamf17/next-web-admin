// components/BarChart.js
import React, { useEffect, useRef } from 'react';
import { Layout } from "antd";
import * as echarts from 'echarts';
const { Content } = Layout;

const BarChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Inisialisasi chart hanya sekali menggunakan chartInstance
    chartInstance.current = echarts.init(chartRef.current);

    // Set the chart options
    const options = {
      title: {
        text: 'Layanan Transaksi',
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: ['Tarik Tunai', 'Overbook', 'Fund Transfer', 'Cek Saldo', 'Setor Tunai'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Sales',
          type: 'bar',
          data: [
              { value: 5, itemStyle: { color: '#FF5733' } },
              { value: 20, itemStyle: { color: '#25BE39' } },
              { value: 36, itemStyle: { color: '#2E25BE' } },
              { value: 10, itemStyle: { color: '#BE25B2' } },
              { value: 10, itemStyle: { color: '#25BEB9' } }
          ],
        },
      ],
    };

    // Apply options to chart instance
    chartInstance.current.setOption(options);

    // Handle resizing of the chart
    const resizeChart = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };

    // Add resize event listener
    window.addEventListener('resize', resizeChart);

    // Clean up on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
      window.removeEventListener('resize', resizeChart);
    };
  }, []);

  return (
    <Content className="layout-content">
      <div className="content-wrapper">
        <div ref={chartRef} style={{ width: '90%', height: '400px' }} />
      </div>
    </Content>
  );
};

export default BarChart;
