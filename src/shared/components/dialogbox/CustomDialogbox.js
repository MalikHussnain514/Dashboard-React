import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const CustomDialogbox = ({ openDelete, handleCloseDelete, handleCloseDeleteYes }) => {
    return (
        <>
            <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth="true"
            >
                <DialogTitle id="alert-dialog-title" sx={{ fontSize: '24px' }}>
                    Delete Confirmation?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ fontSize: '16px' }}>
                        Are you sure you want to delete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete}>No</Button>
                    <Button onClick={handleCloseDeleteYes}>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CustomDialogbox;
