import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chart } from '../../types';

interface ChartState {
  charts: Chart[];
  selectedChartId: string | null;
}

const initialState: ChartState = {
  charts: [],
  selectedChartId: null,
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    addChart: (state, action: PayloadAction<Chart>) => {
      state.charts.push(action.payload);
    },
    deleteChart: (state, action: PayloadAction<string>) => {
      state.charts = state.charts.filter(chart => chart.id !== action.payload);
    },
    selectChart: (state, action: PayloadAction<string>) => {
      state.selectedChartId = action.payload;
    },
  },
});

export const { addChart, deleteChart, selectChart } = chartSlice.actions;
export default chartSlice.reducer;