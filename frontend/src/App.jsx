import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateLeadPage from "./pages/CreateLeadPage";
import LeadsPage from "./pages/LeadsPage";
import LeadDetailPage from "./pages/LeadDetailPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateLeadPage />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/lead/:id" element={<LeadDetailPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;