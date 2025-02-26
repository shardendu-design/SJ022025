// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box, CssBaseline } from '@mui/material'; // Add CssBaseline for consistent styling
import Sidebar from './componenets/Sidebar/Sidebar';
import Chart from './componenets/Chart/Chart';
import Modal from './componenets/Modal/Modal';
import NotFoundPage from './componenets/404Page/404Page';
import { addChart, editChart, deleteChart } from './store/slices/chartSlices';
import { RootState } from './store/store';
import data from './data.json'; // Import the JSON file

interface ChartData {
  id: string;
  name: string;
  dataSeries: { value: number; date: string }[];
}

interface ChartData {
  id: string;
  name: string;
  type: string;
  color: string;
  dataSeries: { value: number; date: string }[];
  xAxisName: string;
  yAxisName: string;
  description: string;
}

const App = () => {
  const dispatch = useDispatch();
  const charts = useSelector((state: RootState) => state.charts.charts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState<ChartData | null>(null);

  // Extract data series options from the JSON file
  const dataSeriesOptions = data.map((sensor) => ({
    name: sensor.name,
    data: sensor.dataseries,
  }));

  const handleAddChart = () => {
    setSelectedChart(null);
    setIsModalOpen(true);
  };

  const handleEditChart = (chartId: string) => {
    const chart = charts.find((c) => c.id === chartId);
    setSelectedChart(chart || null);
    setIsModalOpen(true);
  };

  const handleDeleteChart = (chartId: string) => {
    dispatch(deleteChart(chartId));
  };

  const handleModalSubmit = (data: ChartData) => {
    if (selectedChart) {
      dispatch(editChart({ ...selectedChart, ...data }));
    } else {
      const { id, ...rest } = data;
      dispatch(
        addChart({
          id: Date.now().toString(),
          ...rest,
        })
      );
    }
    setIsModalOpen(false);
  };

  return (
    <Router>
      <CssBaseline />
      <Grid container>
        {/* Sidebar */}
        <Grid item xs={3} sx={{ bgcolor: '#f5f5f5', height: '100vh', p: 2 }}>
          <Sidebar
            charts={charts}
            onAddChart={handleAddChart}
            onEditChart={handleEditChart}
            onDeleteChart={handleDeleteChart}
          />
        </Grid>

        {/* Main Content */}
        <Grid item xs={9}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
              textAlign: 'center',
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  charts.length === 0 ? (
                    <div>
                      <p>No Charts Yet</p>
                      <button onClick={handleAddChart}>Add Chart</button>
                    </div>
                  ) : (
                    <div>Select a chart from the sidebar</div>
                  )
                }
              />
              <Route
                path="/:chartId"
                element={<ChartWrapper charts={charts} />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Box>
        </Grid>
      </Grid>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={
          selectedChart || {
            id: '',
            name: '',
            type: 'line',
            color: '#FF5733',
            dataSeries: [],
            xAxisName: 'X-Axis',
            yAxisName: 'Y-Axis',
            description: '',
          }
        }
        dataSeriesOptions={dataSeriesOptions}
      />
    </Router>
  );
};

// Helper component to handle chart display based on URL params
const ChartWrapper = ({ charts }: { charts: ChartData[] }) => {
  const { chartId } = useParams(); // Extract chartId from the URL
  const chart = charts.find((c) => c.id === chartId);

  return chart ? (
    <Chart data={chart} />
  ) : (
    <div>No chart found</div>
  );
};

export default App;