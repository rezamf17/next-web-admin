import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const LineChart = () => {
	const chartRef = useRef(null);

	useEffect(() => {
		const chartInstance = echarts.init(chartRef.current);

		// Define options for the line chart
		const options = {
			tooltip: {
				trigger: 'axis',
			},
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
					type: 'line',
					data: [150, 230, 224, 218, 135, 147, 260],
				},
			],
		};

		// Set chart options
		chartInstance.setOption(options);

		// Cleanup chart instance when the component is unmounted
		return () => {
			chartInstance.dispose();
		};
	}, []);

	return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default LineChart;
