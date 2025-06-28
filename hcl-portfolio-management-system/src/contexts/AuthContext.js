import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  axios.defaults.baseURL = 'http://localhost:3001';

  const login = async (email, password) => {
    try {
      console.log('Login attempt with:', { email, password });
      setLoading(true);
      
      const response = await axios.get(`/users?email=${email}`);
      console.log('API Response:', response.data);
      
      const user = response.data[0];
      console.log('Found user:', user);

      if (!user) {
        console.log('No user found with email:', email);
        throw new Error('User not found');
      }

      if (user.password !== password) {
        console.log('Password mismatch. Expected:', user.password, 'Got:', password);
        throw new Error('Invalid password');
      }

      console.log('Login successful, setting user:', user);
      setUser({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar
      });
      
      return { success: true, user: user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await axios.post('/users', {
        ...userData,
        id: Date.now(),
        avatar: `https://via.placeholder.com/150/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=${userData.name.charAt(0).toUpperCase()}`
      });
      console.log(response.data);
      return { success: true, user: response.data };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 