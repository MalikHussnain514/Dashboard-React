// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://berrydashboard.io" target="_blank" underline="hover">
            ByonyksWeb.io
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://codedthemes.com" target="_blank" underline="hover">
            &copy; All Rights Reserved
        </Typography>
    </Stack>
);

export default AuthFooter;
