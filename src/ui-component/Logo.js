// material-ui
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        <Typography sx={{ marginLeft: '10px' }} gutterBottom variant="h1" component="div">
            Rock
            <span style={{ color: '#DE6562', fontWeight: 'bold' }}>Tech.</span>
        </Typography>
    );
};

export default Logo;
