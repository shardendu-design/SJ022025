import React from 'react';
import { Grid } from '@mui/material';
import LeftSidebar from '../componenets/LeftSidebar/ChartList';
import MainArea from '../componenets/MainArea/SelectedChart';

const MainPage = () => {
  return (
    <Grid container>
      <Grid item xs={3}>
        <LeftSidebar />
      </Grid>
      <Grid item xs={9}>
        <MainArea />
      </Grid>
    </Grid>
  );
};

export default MainPage;