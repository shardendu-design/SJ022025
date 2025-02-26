// src/components/Sidebar/Sidebar.tsx
import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Menu, MenuItem, Button, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Chart {
  id: string;
  name: string;
}

interface SidebarProps {
  charts: Chart[];
  onAddChart: () => void;
  onEditChart: (chartId: string) => void;
  onDeleteChart: (chartId: string) => void;
}

const Sidebar = ({ charts, onAddChart, onEditChart, onDeleteChart }: SidebarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedChartId, setSelectedChartId] = useState<string | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, chartId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedChartId(chartId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedChartId(null);
  };

  const handleEdit = () => {
    if (selectedChartId) {
      onEditChart(selectedChartId);
      handleMenuClose();
    }
  };

  const handleDelete = () => {
    if (selectedChartId) {
      onDeleteChart(selectedChartId);
      handleMenuClose();
    }
  };

  return (
    <Box sx={{ width: '100%', bgcolor: '#f5f5f5', height: '100vh', p: 2 }}>
      <Button
        variant="contained"
        fullWidth
        onClick={onAddChart}
        sx={{ mb: 2 }}
      >
        Add Chart
      </Button>
      <List>
        {charts.map((chart) => (
          <ListItem
            key={chart.id}
            secondaryAction={
              <IconButton onClick={(e) => handleMenuClick(e, chart.id)}>
                <MoreVertIcon />
              </IconButton>
            }
          >
            <ListItemText primary={chart.name} />
          </ListItem>
        ))}
      </List>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};

export default Sidebar;