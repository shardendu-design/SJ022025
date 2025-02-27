// src/components/Chart/Chart.tsx
import React, { useEffect } from 'react'; // Import useEffect
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useSelector } from 'react-redux';
import { loadSensorData } from '../../utils/loadData';
import { Chart as ChartType } from '../../types';
import { Box, Typography } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // Import DatePicker
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // Import LocalizationProvider
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; // Import AdapterDateFns

const ChartComponent = () => {
  const { chartId } = useParams();
  const navigate = useNavigate(); // Use useNavigate for redirection
  const charts = useSelector((state: any) => state.charts.charts);
  const chart = charts.find((c: ChartType) => c.id === chartId);
  const sensorData = loadSensorData().find((sensor) => sensor.name === chart?.dataSeries);

  

  // Redirect to 404 if the chart is not found
  useEffect(() => {
    if (!chart || !sensorData) {
      navigate('/404'); // Redirect to the 404 route
    }
  }, [chart, sensorData, navigate]);

  // If chart or sensorData is not found, return null (redirect will happen in useEffect)
  if (!chart || !sensorData) {
    return null;
  }

  const options = {
    chart: {
      type: chart.type,
    },
    title: {
      text: chart.name,
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: chart.xAxisName,
      },
    },
    yAxis: {
      title: {
        text: chart.yAxisName,
      },
    },
    series: [
      {
        name: sensorData.name,
        data: sensorData.dataseries.map((point) => [new Date(point.date).getTime(), point.value]),
        color: chart.color,
      },
    ],
  };

  return (
    <Box sx={{ p: 3 }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
};

export default ChartComponent;