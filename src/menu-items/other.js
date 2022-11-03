// assets
import { IconBrandChrome, IconCalendar, IconStethoscope, IconWoman } from '@tabler/icons';
import AccessibleIcon from '@mui/icons-material/Accessible';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
// constant
const icons = {
    IconBrandChrome,
    IconCalendar,
    IconStethoscope,
    IconWoman,
    AccessibleIcon,
    ChatOutlinedIcon
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'user-all-crud',
    type: 'group',
    children: [
        {
            id: 'calendar',
            title: 'Calendar',
            type: 'item',
            url: '/calendar',
            icon: icons.IconCalendar,
            breadcrumbs: false
        },
        {
            id: 'patientlist',
            title: 'Patients',
            type: 'item',
            url: '/patientslist',
            icon: icons.AccessibleIcon,
            breadcrumbs: false
        },
        {
            id: 'doctorlist',
            title: 'Doctors',
            type: 'item',
            url: '/doctorslist',
            icon: icons.IconStethoscope,
            breadcrumbs: false
        },
        {
            id: 'nurselist',
            title: 'Nurses',
            type: 'item',
            url: '/nurseslist',
            icon: icons.IconWoman,
            breadcrumbs: false
        },
        {
            id: 'patientfeedback',
            title: 'Patient Feedback',
            type: 'item',
            url: '/patientfeedback',
            icon: icons.ChatOutlinedIcon,
            breadcrumbs: false
        }
    ]
};

export default other;
