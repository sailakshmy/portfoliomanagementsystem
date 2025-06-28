import React from 'react';
import {
  Container,
  Typography,
  Avatar,
  Button,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Grid
} from '@mui/material';
import {
  AccountCircle,
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import PortfolioPerformanceChart from '../components/PortfolioPerformanceChart';
import { mockPortfolioData } from '../mocks/mocks'

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header/AppBar */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          {/* Logo on the left */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                backgroundColor: 'white',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 2
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: '#1976d2',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}
              >
                PMS
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
              Portfolio Management System
            </Typography>
          </Box>

          {/* User profile on the right */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: 'white', marginRight: 1 }}>
              Welcome, {user.name}
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              sx={{ color: 'white' }}
            >
              <Avatar
                src={user.avatar}
                sx={{ width: 35, height: 35 }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <AccountCircle sx={{ marginRight: 1 }} />
                Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <SettingsIcon sx={{ marginRight: 1 }} />
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ marginRight: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Dashboard Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            Welcome back, {user.name}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's an overview of your portfolio management dashboard
          </Typography>
        </Box>

        {/* Quick Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{
              p: 3,
              backgroundColor: '#e3f2fd',
              borderRadius: 2,
              border: '1px solid #bbdefb',
              textAlign: 'center'
            }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                {mockPortfolioData?.assets?.length ?? 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Assets
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{
              p: 3,
              backgroundColor: '#f3e5f5',
              borderRadius: 2,
              border: '1px solid #e1bee7',
              textAlign: 'center'
            }}>
              <AssessmentIcon sx={{ fontSize: 40, color: '#7b1fa2', mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                ${(mockPortfolioData?.assets?.reduce((sum, asset) => sum + asset.value, 0) ?? 0).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Value
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{
              p: 3,
              backgroundColor: '#e8f5e8',
              borderRadius: 2,
              border: '1px solid #c8e6c9',
              textAlign: 'center'
            }}>
              <DashboardIcon sx={{ fontSize: 40, color: '#388e3c', mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                {mockPortfolioData?.holdings?.length ?? 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Holdings
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Portfolio Performance Chart */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <PortfolioPerformanceChart />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 