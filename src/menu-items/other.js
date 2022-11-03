// assets
import { IconBrandChrome, IconStethoscope, IconWoman } from '@tabler/icons';
import AccessibleIcon from '@mui/icons-material/Accessible';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
// constant
const icons = {
    IconBrandChrome,

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
        }
    ]
};

export default other;
