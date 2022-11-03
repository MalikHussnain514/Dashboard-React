import { Alert, Snackbar } from '@mui/material';
import Slide from '@mui/material/Slide';

const CustomSnackbar = ({ open, handleClose, severity, message }) => {
    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={3000}
                open={open}
                onClose={handleClose}
                key={message}
                TransitionComponent={Slide}
                TransitionProps={{ direction: 'left' }}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%', textTransform: 'capitalize', fontSize: '16px', fontWeight: 700, borderRadius: 10 }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CustomSnackbar;
