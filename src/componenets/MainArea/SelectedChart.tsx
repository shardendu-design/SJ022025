import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ChartComponent from './ChartComponent';

const SelectedChart = () => {
  const selectedChartId = useSelector((state: RootState) => state.chart.selectedChartId);
  const charts = useSelector((state: RootState) => state.chart.charts);
  const selectedChart = charts.find(chart => chart.id === selectedChartId);

  if (!selectedChart) return <div>No chart selected</div>;

  return (
    <div>
      <h2>{selectedChart.name}</h2>
      <ChartComponent data={selectedChart.data} />
    </div>
  );
};

export default SelectedChart;