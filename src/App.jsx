import { Navigate, Route, Routes } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Layout from './components/Layout';
import PageTransition from './components/PageTransition';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ExecutiveSummaryPage from './pages/ExecutiveSummaryPage';
import ResourceCapacityPage from './pages/ResourceCapacityPage';
import ProjectActivityPage from './pages/ProjectActivityPage';
import ProjectPortfolioPage from './pages/ProjectPortfolioPage';
import LeaveHolidayPage from './pages/LeaveHolidayPage';
import ForecastAllocationPage from './pages/ForecastAllocationPage';
import RisksDependenciesPage from './pages/RisksDependenciesPage';
import ReportsPage from './pages/ReportsPage';
import DataEntryPage from './pages/DataEntryPage';
import SettingsPage from './pages/SettingsPage';
import UserDashboard from './pages/UserDashboard';

const FullApp = () => (
  <Layout>
    <PageTransition>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/executive-summary" element={<ExecutiveSummaryPage />} />
        <Route path="/resource-capacity" element={<ResourceCapacityPage />} />
        <Route path="/project-activity" element={<ProjectActivityPage />} />
        <Route path="/project-portfolio" element={<ProjectPortfolioPage />} />
        <Route path="/leave-holiday" element={<LeaveHolidayPage />} />
        <Route path="/forecast-allocation" element={<ForecastAllocationPage />} />
        <Route path="/risks-dependencies" element={<RisksDependenciesPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/data-entry" element={<DataEntryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </PageTransition>
  </Layout>
);

export default function App() {
  const { user } = useApp();
  if (!user) return <LoginPage />;
  if (user.role === 'User') return <Layout><UserDashboard /></Layout>;
  return <FullApp />;
}
