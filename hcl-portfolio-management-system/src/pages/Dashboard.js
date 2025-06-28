import React from 'react';
import { Container, Typography, Avatar, Button, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  console.log("user",user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <Container maxWidth="sm" className="flex flex-col items-center justify-center min-h-screen">
      <Box className="flex flex-col items-center w-full mt-10">
        <Avatar src={user.avatar} sx={{ width: 80, height: 80, mb: 2 }} />
        <Typography variant="h4" className="mb-2">Welcome, {user.name}!</Typography>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
} 