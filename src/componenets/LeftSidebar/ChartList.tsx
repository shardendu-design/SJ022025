import React from 'react';
import { List } from '@mui/material';
import ChartListItem from './ChartListItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const ChartList = () => {
  const charts = useSelector((state: RootState) => state.chart.charts);

  return (
    <List>
      {charts.map(chart => (
        <ChartListItem key={chart.id} chart={chart} />
      ))}
    </List>
  );
};

export default ChartList;