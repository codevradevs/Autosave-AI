import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';

// Landing
import LandingLayout from './pages/landing/LandingLayout';
import HomePage from './pages/landing/HomePage';
import HowItWorksPage from './pages/landing/HowItWorksPage';
import SecurityPage from './pages/landing/SecurityPage';
import AboutPage from './pages/landing/AboutPage';
import SupportPage from './pages/landing/SupportPage';
import WaitlistPage from './pages/landing/WaitlistPage';

// App
import AppLayout from './components/app/AppLayout';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import WalletPage from './pages/WalletPage';
import GoalsPage from './pages/GoalsPage';
import InsightsPage from './pages/InsightsPage';
import ProfilePage from './pages/ProfilePage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useStore(s => s.token);
  return token ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicAppRoute({ children }: { children: React.ReactNode }) {
  const token = useStore(s => s.token);
  return token ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}

export default function App() {
  const { token, fetchMe, fetchInsights } = useStore();

  useEffect(() => {
    if (token) { fetchMe(); fetchInsights(); }
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        {/* ── Landing / public pages ── */}
        <Route element={<LandingLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/waitlist" element={<WaitlistPage />} />
        </Route>

        {/* ── Auth ── */}
        <Route path="/login" element={<PublicAppRoute><AuthPage /></PublicAppRoute>} />

        {/* ── Protected app ── */}
        <Route path="/dashboard" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="wallet" element={<WalletPage />} />
          <Route path="goals" element={<GoalsPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
