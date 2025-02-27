// src/components/Modal/Modal.tsx
import React, { useState } from 'react';
import { SensorData, Chart as ChartType } from '../../types';
import { loadSensorData } from '../../utils/loadData';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (chart: ChartType) => void;
  initialData?: ChartType;
}

const Modal = ({ isOpen, onClose, onSave, initialData }: ModalProps) => {
  const [name, setName] = useState(initialData?.name || '');
  const [dataSeries, setDataSeries] = useState(initialData?.dataSeries || '');
  const [type, setType] = useState(initialData?.type || 'line');
  const [color, setColor] = useState(initialData?.color || '#000000');
  const [xAxisName, setXAxisName] = useState(initialData?.xAxisName || 'Date');
  const [yAxisName, setYAxisName] = useState(initialData?.yAxisName || '°C');
  const [description, setDescription] = useState(initialData?.description || '');
  const sensorData = loadSensorData();

  const handleSave = () => {
    onSave({
      id: initialData?.id || Date.now().toString(),
      name,
      dataSeries,
      type,
      color,
      xAxisName,
      yAxisName,
      description,
    });
    setName('');
    setDataSeries('');
    setType('line');
    setColor('#000000');
    setXAxisName('Date');
    setYAxisName('°C');
    setDescription('');
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Edit Chart' : 'Add Chart'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Chart Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Data Series</InputLabel>
          <Select
            value={dataSeries}
            onChange={(e) => setDataSeries(e.target.value)}
            label="Data Series"
          >
            {sensorData.map((sensor) => (
              <MenuItem key={sensor.name} value={sensor.name}>
                {sensor.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Chart Type</InputLabel>
          <Select value={type} onChange={(e) => setType(e.target.value)} label="Chart Type">
            <MenuItem value="line">Line Chart</MenuItem>
            <MenuItem value="bar">Bar Chart</MenuItem>
            <MenuItem value="pie">Pie Chart</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          type="color"
          label="Chart Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="X-axis Name"
          value={xAxisName}
          onChange={(e) => setXAxisName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Y-axis Name"
          value={yAxisName}
          onChange={(e) => setYAxisName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;