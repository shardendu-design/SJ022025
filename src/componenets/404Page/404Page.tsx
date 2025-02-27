// src/components/404Page/404Page.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        404 - Page Not Found. Please try again later.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {/* The page you are looking for does not exist. */}
      </Typography>
      <Button component={Link} to="/" variant="contained">
        Go Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;