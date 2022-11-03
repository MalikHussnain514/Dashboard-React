import { Avatar, Card, CardHeader, Modal, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import LoadingWrapper from 'shared/components/loadingWrapper/LoadingWrapper';
import { useSelector, useDispatch } from 'react-redux';
import { feedbackListAction } from '../../store/actions/feedback';
import CustomTable from 'shared/components/table/CustomTable';
import moment from 'moment';
import { Box } from '@mui/system';

const columns = [
    { id: 'profileimg', label: 'Patient File', minWidth: 150, format: (value) => console.log(value) },
    { id: 'patientId', label: 'Patient ID', align: 'center', minWidth: 110 },
    { id: 'comments', label: 'Feedback Message', align: 'center', minWidth: 370 },
    { id: 'createdAt', label: 'Created Date', align: 'center', minWidth: 110 }
];

function createData(profileimg, patientId, comments, createdAt) {
    return { profileimg, patientId, comments, createdAt };
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 665,
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 74,
    p: 4
};

const PatientFeedback = () => {
    const [open, setOpen] = React.useState(false);
    const [img, setImg] = React.useState();
    const [comment, setComment] = React.useState();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const DateAppointView = (date) => {
        const isoDate = date;
        const newDate = moment.utc(isoDate).format('lll');
        return newDate;
    };

    const imageClick = (url, message) => {
        console.log('imageClick', url);
        setImg(url);
        setComment(message);
        handleOpen();
    };

    const dispatch = useDispatch();
    const { feedbackList, success, error, loading } = useSelector((state) => state.feedbackList);
    console.log('feedback', feedbackList);

    const rowData = feedbackList?.map((feedback) => {
        return createData(
            <Avatar
                style={{ width: '80px', height: '70px', cursor: 'pointer' }}
                variant="square"
                src={feedback.feedbackImage}
                alt={feedback.feedbackImage}
                onClick={() => imageClick(feedback.feedbackImage, feedback.comments)}
            />,
            feedback.patientId,
            feedback.comments,
            DateAppointView(feedback.createdAt)
        );
    });

    useEffect(() => {
        dispatch(feedbackListAction());
    }, []);

    return (
        <>
            <LoadingWrapper loading={loading}>
                <Card>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <CardHeader title="Patient Feedback" />
                    </div>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        {feedbackList && <CustomTable columns={columns} rows={rowData} />}
                    </Paper>
                </Card>
            </LoadingWrapper>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <img style={{ width: '600px', height: '500px' }} src={img} alt={img} />
                    <Typography sx={{ mt: 2 }} variant="h4">
                        Details
                    </Typography>
                    <Typography sx={{ mt: 1 }} variant="h5">
                        {comment}
                    </Typography>
                </Box>
            </Modal>
        </>
    );
};

export default PatientFeedback;
