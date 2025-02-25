import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';

const ChartForm = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField {...field} label="Chart Name" fullWidth />}
      />
      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField {...field} label="Description" fullWidth />}
      />
      <Button type="submit">Save</Button>
    </form>
  );
};

export default ChartForm;