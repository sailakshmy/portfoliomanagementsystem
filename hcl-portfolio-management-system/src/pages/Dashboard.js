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
  Divider
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
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
          <Box sx={{ 
            p: 3, 
            backgroundColor: '#e3f2fd', 
            borderRadius: 2, 
            border: '1px solid #bbdefb',
            textAlign: 'center'
          }}>
            {/* <PortfolioIcon sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} /> */}
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              3
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active Portfolios
            </Typography>
          </Box>

          <Box sx={{ 
            p: 3, 
            backgroundColor: '#f3e5f5', 
            borderRadius: 2, 
            border: '1px solid #e1bee7',
            textAlign: 'center'
          }}>
            <AssessmentIcon sx={{ fontSize: 40, color: '#7b1fa2', mb: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              $125K
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Value
            </Typography>
          </Box>

          <Box sx={{ 
            p: 3, 
            backgroundColor: '#e8f5e8', 
            borderRadius: 2, 
            border: '1px solid #c8e6c9',
            textAlign: 'center'
          }}>
            <DashboardIcon sx={{ fontSize: 40, color: '#388e3c', mb: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              12.5%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              YTD Return
            </Typography>
          </Box>
        </Box>

        {/* User Role Badge */}
        <Box sx={{ 
          display: 'inline-block', 
          p: 2, 
          backgroundColor: user.role === 'admin' ? '#ffebee' : user.role === 'manager' ? '#fff3e0' : '#e8f5e8',
          borderRadius: 2,
          border: `1px solid ${user.role === 'admin' ? '#ffcdd2' : user.role === 'manager' ? '#ffe0b2' : '#c8e6c9'}`
        }}>
          <Typography variant="body2" sx={{ 
            color: user.role === 'admin' ? '#c62828' : user.role === 'manager' ? '#ef6c00' : '#2e7d32',
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}>
            Role: {user.role}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
} 