import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import SelectedChart from '../componenets/MainArea/SelectedChart';

const ChartPage = () => {
  const { chartId } = useParams();
  const charts = useSelector((state: RootState) => state.chart.charts);
  const selectedChart = charts.find(chart => chart.id === chartId);

  if (!selectedChart) return <div>Chart not found</div>;

  return <SelectedChart />;
};

export default ChartPage;