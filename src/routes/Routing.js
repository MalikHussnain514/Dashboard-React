import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from 'layout/MainLayout';

// Auth components
const AuthLoginPage = Loadable(lazy(() => import('views/pages/authentication/authentication/Login')));
// Main components
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const CalendarPage = Loadable(lazy(() => import('views/calendar')));
const PatientsList = Loadable(lazy(() => import('views/patient/PatientList')));
const PatientReport = Loadable(lazy(() => import('views/patient/PatientReport')));
const DoctorsList = Loadable(lazy(() => import('views/doctor/DoctorList')));
const NursesList = Loadable(lazy(() => import('views/nurse/Nurselist')));
const PatientFeedback = Loadable(lazy(() => import('views/feedback/PatientFeedback')));

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <MainLayout>
                    <Route path="/" element={<DashboardDefault />} theme={<MainLayout />} />
                    <Route path="/dashboard" element={<DashboardDefault />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/patientreport" element={<PatientReport />} />
                    <Route path="/patientslist" element={<PatientsList />} />
                    <Route path="/doctorslist" element={<DoctorsList />} />
                    <Route path="/nurseslist" element={<NursesList />} />
                    <Route path="/patientfeedback" element={<PatientFeedback />} />
                </MainLayout>
            </Route>
            <Route path="/login" element={<AuthLoginPage />} />
        </Routes>
    );
}
