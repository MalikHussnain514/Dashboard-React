// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Pages',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'authentication',
            title: 'Authentication',
            type: 'collapse',
            icon: icons.IconKey,

            children: [
                {
                    id: 'login',
                    title: 'LoginPage',
                    type: 'item',
                    url: '/login',
                    target: true
                },
                {
                    id: 'register',
                    title: 'RegisterPage',
                    type: 'item',
                    url: '/register',
                    target: true
                }
            ]
        }
    ]
};

export default pages;
