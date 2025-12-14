// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on initial load
    const storedUser = localStorage.getItem('mobius_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('mobius_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // In a real app, this would be an API call
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in production, verify with backend
      if (email && password.length >= 6) {
        const mockUser = {
          id: 'user_' + Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0].replace('.', ' '),
          role: 'researcher',
          organization: 'Pharma Corp',
          avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=0A2463&color=fff`
        };
        
        setUser(mockUser);
        localStorage.setItem('mobius_user', JSON.stringify(mockUser));
        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (email, password, name, organization) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password.length >= 6 && name) {
        const mockUser = {
          id: 'user_' + Math.random().toString(36).substr(2, 9),
          email,
          name,
          role: 'researcher',
          organization: organization || 'New Organization',
          avatar: `https://ui-avatars.com/api/?name=${name}&background=0A2463&color=fff`
        };
        
        setUser(mockUser);
        localStorage.setItem('mobius_user', JSON.stringify(mockUser));
        return { success: true };
      } else {
        throw new Error('Please fill all required fields');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mobius_user');
    navigate('/login');
  };

  const resetPassword = async (email) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    // In production, this would trigger an email
    return { success: true, message: 'Password reset instructions sent to your email' };
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    resetPassword,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};