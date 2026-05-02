import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Careers from './pages/Careers';
import Home from './pages/Home';
import Apply from './pages/Apply';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Candidates from './pages/Candidates';
import Interviews from './pages/Interviews';
import Offers from './pages/Offers';
import Settings from './pages/Settings';
import AdminJobs from './pages/AdminJobs';
import DashboardLayout from './layouts/DashboardLayout';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  return <DashboardLayout>{children}</DashboardLayout>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/apply/:jobId" element={<Apply />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/admin/candidates" 
            element={<ProtectedRoute><Candidates /></ProtectedRoute>} 
          />
          <Route 
            path="/admin/interviews" 
            element={<ProtectedRoute><Interviews /></ProtectedRoute>} 
          />
          <Route 
            path="/admin/offers" 
            element={<ProtectedRoute><Offers /></ProtectedRoute>} 
          />
          <Route 
            path="/admin/settings" 
            element={<ProtectedRoute><Settings /></ProtectedRoute>} 
          />
          <Route 
            path="/admin/jobs" 
            element={<ProtectedRoute><AdminJobs /></ProtectedRoute>} 
          />
          
          {/* Redirects */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
