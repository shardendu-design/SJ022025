// src/components/Chart/Chart.tsx
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loadSensorData } from '../../utils/loadData';
import { Chart as ChartType, DataPoint } from '../../types';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const ChartComponent = () => {
  const { chartId } = useParams();
  const navigate = useNavigate();
  const charts = useSelector((state: any) => state.charts.charts);
  const chart = charts.find((c: ChartType) => c.id === chartId);
  const sensorData = loadSensorData().find((sensor) => sensor.name === chart?.dataSeries);

  // State for date range
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isEditingPeriod, setIsEditingPeriod] = useState(false); // State to toggle edit mode

  // Calculate initial date range from data
  useEffect(() => {
    if (sensorData) {
      const dates = sensorData.dataseries.map((point) => new Date(point.date).getTime());
      const minDate = new Date(Math.min(...dates));
      const maxDate = new Date(Math.max(...dates));
      setStartDate(minDate);
      setEndDate(maxDate);
    }
  }, [sensorData]);

  // Redirect to 404 if the chart is not found
  useEffect(() => {
    if (!chart || !sensorData) {
      navigate('/404');
    }
  }, [chart, sensorData, navigate]);

  // If chart or sensorData is not found, return null (redirect will happen in useEffect)
  if (!chart || !sensorData) {
    return null;
  }

  // Filter data based on date range
  const filteredData = sensorData.dataseries.filter((point) => {
    const pointDate = new Date(point.date).getTime();
    return (
      (!startDate || pointDate >= startDate.getTime()) &&
      (!endDate || pointDate <= endDate.getTime())
    );
  });

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
        data: filteredData.map((point) => [new Date(point.date).getTime(), point.value]),
        color: chart.color,
      },
    ],
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3 }}>
        {/* Title and Period aligned at the same height */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between', // Title on the left, period on the right
            alignItems: 'center', // Ensures both elements are aligned
            mb: 2,
          }}
        >
          {/* Chart Title */}
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {chart.name}
          </Typography>
  
          {/* Period Display (Remains unchanged) */}
          <Box
            sx={{
              position: 'relative',
              border: '1px solid #ccc',
              padding: '8px 16px',
              width: 'fit-content',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                position: 'absolute',
                top: '-10px',
                left: '16px',
                backgroundColor: '#fff',
                padding: '0 4px',
                color: '#666',
              }}
            >
              Period
            </Typography>
  
            {isEditingPeriod ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <DatePicker
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  slots={{
                    textField: (params) => (
                      <TextField {...params} size="small" sx={{ width: '120px' }} />
                    ),
                  }}
                />
                <Typography variant="body1">to</Typography>
                <DatePicker
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  slots={{
                    textField: (params) => (
                      <TextField {...params} size="small" sx={{ width: '120px' }} />
                    ),
                  }}
                />
                <IconButton onClick={() => setIsEditingPeriod(false)}>
                  <Typography variant="body2">Done</Typography>
                </IconButton>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onClick={() => setIsEditingPeriod(true)}
              >
                <Typography variant="body1">
                  {startDate?.toLocaleDateString()} - {endDate?.toLocaleDateString()}
                </Typography>
                <IconButton
                  sx={{
                    padding: 0,
                    margin: 0,
                    '&:hover': { backgroundColor: 'transparent' },
                  }}
                >
                  <CalendarTodayIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>
  
        {/* Chart */}
        <HighchartsReact highcharts={Highcharts} options={{
          chart: { type: chart.type },
          title: { text: '' }, // Title already outside, so remove from here
          xAxis: {
            title: { 
              text: chart.xAxisName,
              style: { fontWeight: "bold" } // Make x-axis title bold
            },
            categories: sensorData.dataseries.map((point) => point.date), // Use raw date values
          },
          
          yAxis: {
            title: { 
              text: chart.yAxisName,
              style: { fontWeight: "bold" } // Make y-axis title bold
            },
          },
          
          series: [{
            name: sensorData.name,
            data: filteredData.map((point) => point.value), // Keep raw values
            color: chart.color,
          }],
          
        }} />
  
        {/* Description (Remains unchanged) */}
        {chart.description && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body1">{chart.description}</Typography>
          </Box>
        )}
      </Box>
    </LocalizationProvider>
  );
  
};

export default ChartComponent;