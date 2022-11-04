/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-debugger */

import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import moment from 'moment';

import CustomTable from 'shared/components/table/CustomTable';
import { useSelector, useDispatch } from 'react-redux';
import { doctorAction, doctorDeleteAction } from '../../store/actions/doctorAction';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Button, Card, CardActions, CardHeader, Grid, IconButton, Input, Modal, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import LoadingWrapper from 'shared/components/loadingWrapper/LoadingWrapper';
import CustomDialogbox from 'shared/components/dialogbox/CustomDialogbox';
import '../bot/bot.css';

const columns = [
    { id: 'phone', label: 'Phone', minWidth: 170, align: 'center', format: (value) => value.toLocaleString('en-US') },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    { id: 'botFlowId', label: 'Bot Flow Id', minWidth: 170, align: 'center' },
    { id: 'time', label: 'Time', minWidth: 170, align: 'center' },
    {
        id: 'action',
        label: 'Action',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(2)
    }
];

function createData(phone, email, botFlowId, time, action) {
    return { phone, email, botFlowId, time, action };
}

const EmailList = () => {
    const [doctorDeleteData, setDoctorDeleteData] = useState();
    const [openDelete, setOpenDelete] = useState(false);

    const Input = styled('input')({
        display: 'none'
    });

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const dispatch = useDispatch();

    const { doctorList, success, error, loading } = useSelector((state) => state.doctorList);

    const {
        success: doctorDeleteSuccess,
        error: doctorDeleteError,
        loading: doctorDeleteLoading
    } = useSelector((state) => state.doctorDelete);

    const handleCloseDeleteYes = () => {
        console.log(doctorDeleteData.id);
        setOpenDelete(false);
        debugger;
        dispatch(doctorDeleteAction(doctorDeleteData._id));
    };

    const handleDeleteClick = (e, d) => {
        e.preventDefault();
        console.log(d);
        setDoctorDeleteData(d);
        setOpenDelete(true);
    };

    const rowData = doctorList?.map((doctor) => {
        const date = doctor?.time;
        const newDate = moment.utc(date).format('LLLL');

        return createData(
            doctor.phone,
            doctor.email,
            doctor.botFlowId,
            newDate,
            <span>
                <IconButton aria-label="delete">
                    <DeleteIcon style={{ fill: '#a92920' }} onClick={(event) => handleDeleteClick(event, doctor)} />
                </IconButton>
            </span>
        );
    });

    React.useEffect(() => {
        dispatch(doctorAction());
    }, [dispatch, doctorDeleteSuccess]);
    return (
        <>
            <LoadingWrapper loading={loading}>
                <Card>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <CardHeader title="Email List" />
                    </div>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        {doctorList && <CustomTable columns={columns} rows={rowData} />}
                    </Paper>
                </Card>
            </LoadingWrapper>

            <CustomDialogbox openDelete={openDelete} handleCloseDelete={handleCloseDelete} handleCloseDeleteYes={handleCloseDeleteYes} />
            {!loading && !doctorList && (
                <div
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '140px' }}
                >
                    <Typography variant="h3" gutterBottom>
                        404
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                        Oops, Server Not Responding...
                    </Typography>
                    <Typography variant="h3">Please Check Your Internet Connection</Typography>
                </div>
            )}
        </>
    );
};

export default EmailList;
