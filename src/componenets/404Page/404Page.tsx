// src/components/404Page/404Page.tsx
import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>No Page Found</h1>
      <Button onClick={() => navigate('/')}>Go Home</Button>
    </div>
  );
};

export default NotFoundPage;