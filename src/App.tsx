// src/App.tsx

// import React from 'react';
import React, { useState } from "react";

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Grid, Box, Typography, Button } from '@mui/material';
import Sidebar from './componenets/Sidebar/Sidebar';
import ChartComponent from './componenets/Chart/Chart';
import NotFoundPage from './componenets/404Page/404Page';

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <Router>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Sidebar isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Box sx={{ p: 3 }}>
            <Routes>
              <Route
                path="/"
                element={
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '80vh',
                    }}
                  >
                    <Typography variant="h4" sx={{ mb: 2 }}>
                      No chart created yet.
                    </Typography>
                    <Button variant="contained" onClick={() => setModalOpen(true)}>
                      Add Chart
                    </Button>
                  </Box>
                }
              />
              <Route path="/:chartId" element={<ChartComponent />} />
              <Route path="/404" element={<NotFoundPage />} /> {/* Add this route */}
              <Route path="*" element={<Navigate to="/404" replace />} /> {/* Catch-all route */}
            </Routes>
          </Box>
        </Grid>
      </Grid>
    </Router>
  );
};

export default App;
