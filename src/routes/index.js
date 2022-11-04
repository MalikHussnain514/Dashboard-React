import { useRoutes, Navigate } from 'react-router-dom';

import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';

// routes
import MinimalLayout from 'layout/MinimalLayout';
import MainLayout from 'layout/MainLayout';
// Auth components imports
const AuthLoginPage = Loadable(lazy(() => import('views/pages/authentication/authentication/Login')));

// main components imports

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const BotList = Loadable(lazy(() => import('views/bot/BotList')));
const EmailList = Loadable(lazy(() => import('views/email/EmailList')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const user = localStorage.getItem('user');
    const userParse = JSON.parse(user);
    const token = userParse && userParse?.token;
    // eslint-disable-next-line no-debugger
    const routes = useRoutes([
        {
            element: <MinimalLayout />,
            children: [
                {
                    path: '/login',
                    element: !token ? <AuthLoginPage /> : <Navigate to="/" replace={true} />
                    // element: <AuthLoginPage />
                }
            ]
        },
        {
            element: <MainLayout />,
            children: [
                {
                    path: '',
                    element: token ? <DashboardDefault /> : <Navigate to="/login" />
                },
                {
                    path: '/dashboard',
                    element: token ? <DashboardDefault /> : <Navigate to="/login" />
                },

                {
                    path: '/botslist',
                    element: token ? <BotList /> : <Navigate to="/login" />
                },
                {
                    path: '/mailslist',
                    element: token ? <EmailList /> : <Navigate to="/login" />
                }
            ]
        }
    ]);

    return routes;
}
