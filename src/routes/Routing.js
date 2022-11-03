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
const PatientsList = Loadable(lazy(() => import('views/patient/PatientList')));
const DoctorsList = Loadable(lazy(() => import('views/doctor/DoctorList')));

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <MainLayout>
                    <Route path="/" element={<DashboardDefault />} theme={<MainLayout />} />
                    <Route path="/dashboard" element={<DashboardDefault />} />
                    <Route path="/patientslist" element={<PatientsList />} />
                    <Route path="/doctorslist" element={<DoctorsList />} />
                </MainLayout>
            </Route>
            <Route path="/login" element={<AuthLoginPage />} />
        </Routes>
    );
}
