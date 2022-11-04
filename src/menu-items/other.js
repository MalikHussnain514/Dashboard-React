// assets
import { IconMicrophone, IconMail } from '@tabler/icons';
import AccessibleIcon from '@mui/icons-material/Accessible';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
// constant
const icons = {
    IconMicrophone,
    IconMail,
    ChatOutlinedIcon
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'user-all-crud',
    type: 'group',
    children: [
        {
            id: 'botlist',
            title: 'Bots',
            type: 'item',
            url: '/botslist',
            icon: icons.IconMicrophone,
            breadcrumbs: false
        },
        {
            id: 'maillist',
            title: 'Emails',
            type: 'item',
            url: '/mailslist',
            icon: icons.IconMail,
            breadcrumbs: false
        }
    ]
};

export default other;
