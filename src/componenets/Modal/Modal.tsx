// src/components/Modal/Modal.tsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Modal, TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

interface ChartModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData: {
    id: string;
    name: string;
    type: string;
    color: string;
    dataSeries: { value: number; date: string }[];
    xAxisName: string;
    yAxisName: string;
    description: string;
  };
  dataSeriesOptions: { name: string; data: { value: number; date: string }[] }[];
}

const ChartModal = ({ open, onClose, onSubmit, initialData, dataSeriesOptions }: ChartModalProps) => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: initialData,
  });

  // Options for type and color dropdowns
  const typeOptions = ['line', 'bar', 'pie'];
  const colorOptions = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF5'];

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Chart Name */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Chart Name"
                fullWidth
                sx={{ mb: 2 }}
              />
            )}
          />

          {/* Chart Type */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Chart Type</InputLabel>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Chart Type">
                  {typeOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          {/* Chart Color */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Chart Color</InputLabel>
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Chart Color">
                  {colorOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          backgroundColor: option,
                          mr: 2,
                        }}
                      />
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          {/* Data Series */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Data Series</InputLabel>
            <Controller
              name="dataSeries"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Data Series"
                  value={field.value || []}
                  onChange={(e) => {
                    const selectedData = JSON.parse(e.target.value as string);
                    field.onChange(selectedData);
                  }}
                >
                  {dataSeriesOptions.map((option) => (
                    <MenuItem key={option.name} value={JSON.stringify(option.data)}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          {/* X-Axis Name */}
          <Controller
            name="xAxisName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="X-Axis Name"
                fullWidth
                sx={{ mb: 2 }}
              />
            )}
          />

          {/* Y-Axis Name */}
          <Controller
            name="yAxisName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Y-Axis Name"
                fullWidth
                sx={{ mb: 2 }}
              />
            )}
          />

          {/* Description */}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />
            )}
          />

          {/* Save and Cancel Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              type="button"
              variant="outlined"
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" fullWidth>
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ChartModal;