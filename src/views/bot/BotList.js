/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-debugger */

import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';

import CustomTable from 'shared/components/table/CustomTable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { botListAction, botAddAction, botDeleteAction, botEditAction } from '../../store/actions/bot';
import { Button, Card, CardActions, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import FormikField from 'shared/components/form/FormikForm';
import { styled } from '@mui/material/styles';
import CustomButton from 'shared/components/button/CustomButton';
import { useTheme } from 'styled-components';
import CustomModal from 'shared/components/modal/CustomModal';

import './bot.css';
import LoadingWrapper from 'shared/components/loadingWrapper/LoadingWrapper';
import CustomDialogbox from 'shared/components/dialogbox/CustomDialogbox';

const columns = [
    { id: 'name', label: 'Name', minWidth: 170, align: 'center' },
    { id: 'assignedDomain', label: 'Assigned Domain', minWidth: 170, align: 'center' },
    {
        id: 'assignedEmail',
        label: 'Assigned Email',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    { id: 'botFlowId', label: 'Bot Flow Id', minWidth: 170, align: 'center' },

    {
        id: 'action',
        label: 'Action',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(2)
    }
];

function createData(name, assignedDomain, assignedEmail, botFlowId, action) {
    return { name, assignedDomain, assignedEmail, botFlowId, action };
}

const BotList = () => {
    const theme = useTheme();
    const [botDeleteData, setBotDeleteData] = useState();

    const [openDelete, setOpenDelete] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [addBot, setAddBot] = useState(false);
    const [editBot, setEditBot] = useState(false);

    const [initialValues, setInitialValues] = useState({
        _id: '',
        name: '',
        assignedDomain: '',
        assignedEmail: '',
        botFlowId: ''
    });

    const Input = styled('input')({
        display: 'none'
    });

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const dispatch = useDispatch();
    const { botList, success, error, loading } = useSelector((state) => state.botList);

    const { success: botDeleteSuccess } = useSelector((state) => state.botDelete);

    const { success: botAddSuccess, loading: botAddLoading } = useSelector((state) => state?.botAdd);

    const { success: botEditSuccess, error: botEditError, loading: botEditLoading } = useSelector((state) => state.botEdit);

    const handleCloseDeleteYes = () => {
        dispatch(botDeleteAction(botDeleteData._id));
        setOpenDelete(false);
    };

    const addBotHandler = () => {
        setOpenModal(true);
        setEditBot(false);
        setAddBot(true);
        setInitialValues({
            name: '',
            assignedDomain: '',
            assignedEmail: '',
            botFlowId: ''
        });
    };

    const handleEditClick = (e, p) => {
        setOpenModal(true);
        setAddBot(false);
        setEditBot(true);
        setInitialValues({
            _id: p._id,
            name: p.name,
            assignedDomain: p.assignedDomain,
            assignedEmail: p.assignedEmail,
            botFlowId: p.botFlowId
        });
    };

    const handleDeleteClick = (e, p) => {
        e.preventDefault();

        setBotDeleteData(p);

        setOpenDelete(true);
    };

    const handleClose = () => {
        setInitialValues({
            name: '',
            assignedDomain: '',
            assignedEmail: '',
            botFlowId: ''
        });
        setOpenModal(false);
        setEditBot(!editBot);
        setAddBot(!addBot);
    };

    const rowData = botList?.map((bot) => {
        return createData(
            bot.name,
            bot.assignedDomain,
            bot.assignedEmail,
            bot.botFlowId,
            <span>
                <IconButton aria-label="update">
                    <EditIcon style={{ fill: '#008CBA' }} onClick={(event) => handleEditClick(event, bot)} />
                </IconButton>

                <IconButton aria-label="delete">
                    <DeleteIcon style={{ fill: '#a92920' }} onClick={(event) => handleDeleteClick(event, bot)} />
                </IconButton>
            </span>
        );
    });

    useEffect(() => {
        dispatch(botListAction());
        if (botAddSuccess || botEditSuccess) {
            setOpenModal(false);
        }
    }, [dispatch, botAddSuccess, botEditSuccess, botDeleteSuccess]);

    return (
        <>
            <LoadingWrapper loading={loading}>
                <Card>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <CardHeader title="Bots List" />
                        <CardActions>
                            <Button variant="contained" onClick={addBotHandler}>
                                Add Bot
                            </Button>
                        </CardActions>
                    </div>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>{botList && <CustomTable columns={columns} rows={rowData} />}</Paper>
                </Card>
            </LoadingWrapper>
            {addBot && (
                <CustomModal open={openModal} handleClose={handleClose}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={Yup.object({
                            name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
                            assignedDomain: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),

                            assignedEmail: Yup.string().email('Invalid Email').required('Required!'),
                            botFlowId: Yup.string().min(1, 'Too Short!').max(15, 'Too Long!').required('Required')
                        })}
                        onSubmit={async (values, { setSubmitting, setErrors, setFieldValue }) => {
                            dispatch(botAddAction(values));
                        }}
                    >
                        <Form className="d-flex flex-column">
                            <h1 style={{ textAlign: 'center' }}>Bot Creation</h1>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item xs={12}>
                                    <FormikField variant="outlined" type="text" name="name" label="Bot Name" />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormikField variant="outlined" type="text" name="assignedDomain" label="Assign Domain" />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="email" name="assignedEmail" label="Assign Email" />
                                </Grid>

                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="text" name="botFlowId" label="Bot Id" />
                                </Grid>

                                <Grid item xs={6}>
                                    <CustomButton fullWidth type="submit" title="Register" loading={botAddLoading} />
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </CustomModal>
            )}

            {editBot && (
                <CustomModal open={openModal} handleClose={handleClose}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={Yup.object({
                            name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
                            assignedDomain: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
                            assignedEmail: Yup.string().email('Invalid Email').required('Required!'),
                            botFlowId: Yup.string().min(1, 'Too Short!').max(15, 'Too Long!').required('Required')
                        })}
                        onSubmit={async (values, { setSubmitting, setErrors, setFieldValue }) => {
                            dispatch(botEditAction(values));
                        }}
                    >
                        <Form className="d-flex flex-column">
                            <h1 style={{ textAlign: 'center' }}>Bot Edit Form</h1>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 3 }} variant="outlined" type="text" name="name" label="Bot Name" />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormikField
                                        sx={{ mt: 3 }}
                                        variant="outlined"
                                        type="text"
                                        name="assignedDomain"
                                        label="Assign Domain"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="email" name="assignedEmail" label="Email" />
                                </Grid>

                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="text" name="botFlowId" label="Bot Id" />
                                </Grid>

                                <Grid item xs={6}>
                                    <CustomButton fullWidth type="submit" title="Update" loading={botEditLoading} />
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </CustomModal>
            )}
            <CustomDialogbox openDelete={openDelete} handleCloseDelete={handleCloseDelete} handleCloseDeleteYes={handleCloseDeleteYes} />
            {!loading && !botList && (
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

export default BotList;
