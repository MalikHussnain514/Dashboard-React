import { Box } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { LoadingButton } from '@mui/lab';

const CustomButton = ({ fullWidth, type, title, loading }) => {
    return (
        <Box sx={{ mt: 2 }}>
            <AnimateButton>
                <LoadingButton
                    fullWidth={fullWidth}
                    loading={loading}
                    loadingPosition="center"
                    disableElevation
                    size="large"
                    type={type}
                    variant="contained"
                >
                    {title}
                </LoadingButton>
            </AnimateButton>
        </Box>
    );
};

export default CustomButton;
