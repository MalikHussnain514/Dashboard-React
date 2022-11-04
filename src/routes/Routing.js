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
const BotList = Loadable(lazy(() => import('views/bot/BotList')));
const EmailList = Loadable(lazy(() => import('views/email/EmailList')));

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <MainLayout>
                    <Route path="/" element={<DashboardDefault />} theme={<MainLayout />} />
                    <Route path="/dashboard" element={<DashboardDefault />} />
                    <Route path="/botslist" element={<BotList />} />
                    <Route path="/mailslist" element={<EmailList />} />
                </MainLayout>
            </Route>
            <Route path="/login" element={<AuthLoginPage />} />
        </Routes>
    );
}
