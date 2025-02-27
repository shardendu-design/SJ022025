// store/slices/chartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chart } from '../../types';

interface ChartState {
  charts: Chart[];
}

const initialState: ChartState = {
  charts: [],
};

const chartSlice = createSlice({
  name: 'charts',
  initialState,
  reducers: {
    addChart: (state, action: PayloadAction<Chart>) => {
      state.charts.push(action.payload);
    },
    editChart: (state, action: PayloadAction<Chart>) => {
      const index = state.charts.findIndex((chart) => chart.id === action.payload.id);
      if (index !== -1) {
        state.charts[index] = action.payload;
      }
    },
    deleteChart: (state, action: PayloadAction<string>) => {
      state.charts = state.charts.filter((chart) => chart.id !== action.payload);
    },
  },
});

export const { addChart, editChart, deleteChart } = chartSlice.actions;
export default chartSlice.reducer;