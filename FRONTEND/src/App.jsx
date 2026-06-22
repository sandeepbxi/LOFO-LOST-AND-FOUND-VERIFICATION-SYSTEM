import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Discover from './pages/Discover';
import Report from './pages/Report';
import Claims from './pages/Claims';
import ClaimDetails from './pages/ClaimDetails';
import Verification from './pages/Verification';
import Admin from './pages/Admin';
import ReportsInventory from './pages/ReportsInventory';
import SystemAnalytics from './pages/SystemAnalytics';
import VerificationList from './pages/VerificationList';
import Toast from './components/Toast';

// Placeholder pages for those not yet implemented
const PlaceholderPage = ({ title }) => (
  <div className="min-h-screen flex items-center justify-center bg-background p-8">
    <div className="bg-white border-2 border-[#111111] p-12 hard-shadow text-center">
      <h1 className="text-4xl font-black uppercase text-[#111111] mb-4">{title}</h1>
      <p className="text-secondary font-bold uppercase tracking-widest">Component under construction</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Toast />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/report" element={<Report />} />
        <Route path="/claims" element={<Claims />} />
        <Route path="/claims/:id" element={<ClaimDetails />} />
        <Route path="/lost-reports" element={<ReportsInventory type="Lost" />} />
        <Route path="/found-reports" element={<ReportsInventory type="Found" />} />
        <Route path="/analytics" element={<SystemAnalytics />} />
        <Route path="/verification" element={<VerificationList />} />
        <Route path="/verification/:id" element={<Verification />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
