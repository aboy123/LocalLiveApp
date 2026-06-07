import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LocalLife from './pages/LocalLife';
import MerchantDetail from './pages/MerchantDetail';
import Housekeeping from './pages/Housekeeping';
import Activities from './pages/Activities';
import Forum from './pages/Forum';
import ForumDetail from './pages/ForumDetail';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/local-life" element={<LocalLife />} />
          <Route path="/local-life/:id" element={<MerchantDetail />} />
          <Route path="/housekeeping" element={<Housekeeping />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/:id" element={<ForumDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
