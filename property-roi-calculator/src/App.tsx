import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/layout/Header';
import { MultiStepForm } from './components/layout/MultiStepForm';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { Login } from './pages/Login';

function App() {
  // Mock user for development - replace with actual auth
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'analyst'
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Header user={user} />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/calculator" replace />} />
              <Route path="/calculator" element={<MultiStepForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App
