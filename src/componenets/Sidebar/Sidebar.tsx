// src/components/Sidebar/Sidebar.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addChart, editChart, deleteChart } from '../../store/slices/chartSlices';
import Modal from '../Modal/Modal';
import { Chart as ChartType } from '../../types';
import {
  Drawer,
  Box,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  useMediaQuery,
  useTheme,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from "@mui/icons-material/Search";

interface SidebarProps {
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isModalOpen, setModalOpen }: SidebarProps) => {
  const [editingChart, setEditingChart] = useState<ChartType | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedChartId, setSelectedChartId] = useState<string | null>(null);
  const charts = useSelector((state: any) => state.charts.charts);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Filter charts based on search query
  const filteredCharts = charts.filter((chart: ChartType) =>
    chart.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddChart = (chart: ChartType) => {
    dispatch(addChart(chart));
    setModalOpen(false);
  };

  const handleEditChart = (chart: ChartType) => {
    setEditingChart(chart);
    setModalOpen(true);
    handleCloseMenu();
  };

  const handleDeleteChart = (id: string) => {
    dispatch(deleteChart(id));
    handleCloseMenu();
  };

  const handleSaveEditedChart = (chart: ChartType) => {
    dispatch(editChart(chart));
    setModalOpen(false);
    setEditingChart(null);
  };

  const handleDrawerToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, chartId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedChartId(chartId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedChartId(null);
  };

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ position: 'fixed', top: 10, left: 10, zIndex: 1200 }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* Logo and Name at the top */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <img src="path_to_logo.png" alt="Logo" style={{ width: 40, height: 40, marginRight: 10 }} />
            <Typography variant="body1" component="div">Logoipusum</Typography>
          </Box>

          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={() => setModalOpen(true)}
            sx={{ mb: 2 }}
          >
            Add Chart
          </Button>
          <List>
            {filteredCharts.length === 0 ? (
              <Typography variant="body2">No charts found.</Typography>
            ) : (
              filteredCharts.map((chart: ChartType) => (
                <ListItem key={chart.id} component={Link} to={`/${chart.id}`}>
                  <ListItemText primary={chart.name} />
                  <ListItemSecondaryAction>
                    <IconButton onClick={(e) => handleOpenMenu(e, chart.id)}>
                      <MoreVertIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            )}
          </List>
        </Box>
      </Drawer>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
      >
        <MenuItem onClick={() => handleEditChart(charts.find((c: ChartType) => c.id === selectedChartId))}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleDeleteChart(selectedChartId!)}>
          Delete
        </MenuItem>
      </Menu>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingChart(null);
        }}
        onSave={editingChart ? handleSaveEditedChart : handleAddChart}
        initialData={editingChart ?? undefined}
      />
    </>
  );
};

export default Sidebar;