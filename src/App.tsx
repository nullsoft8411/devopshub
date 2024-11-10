import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LabProgressProvider } from './contexts/LabProgressContext';
import { LearningPathProvider } from './contexts/LearningPathContext';
import { DashboardLayout } from './components/layouts/DashboardLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Overview from './pages/dashboard/Overview';
import LearningPaths from './pages/dashboard/LearningPaths';
import LearningPathDetail from './pages/dashboard/LearningPathDetail';
import Labs from './pages/dashboard/Labs';
import LabDetail from './pages/dashboard/LabDetail';
import Courses from './pages/dashboard/Courses';
import CourseDetail from './pages/dashboard/CourseDetail';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <LabProgressProvider>
          <LearningPathProvider>
            <Routes>
              {/* Public auth routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />

              {/* Dashboard layout wrapper */}
              <Route path="/" element={<DashboardLayout />}>
                <Route index element={<Overview />} />
                <Route path="paths" element={<LearningPaths />} />
                <Route path="paths/:pathId" element={<LearningPathDetail />} />
                <Route path="courses" element={<Courses />} />
                <Route path="courses/:courseId" element={<CourseDetail />} />
                <Route path="labs" element={<Labs />} />
                <Route path="labs/:labId" element={<LabDetail />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Routes>
          </LearningPathProvider>
        </LabProgressProvider>
      </AuthProvider>
    </Router>
  );
}