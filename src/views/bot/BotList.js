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
import { patientListAction, patientAddAction, patientDeleteAction, patientEditAction } from '../../store/actions/patient';
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
    { id: 'assigneddomain', label: 'Assigned Domain', minWidth: 170, align: 'center' },
    {
        id: 'assignedemail',
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

function createData(name, assigneddomain, assignedemail, botFlowId, action) {
    return { name, assigneddomain, assignedemail, botFlowId, action };
}

const BotList = () => {
    const theme = useTheme();
    const [patientDeleteData, setPatientDeleteData] = useState();

    const [openDelete, setOpenDelete] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [addPatient, setAddPatient] = useState(false);
    const [editPatient, setEditPatient] = useState(false);

    const [initialValues, setInitialValues] = useState({
        name: '',
        assigneddomain: '',
        assignedemail: '',
        botFlowId: ''
    });

    const [date, setDate] = useState(new Date());

    const Input = styled('input')({
        display: 'none'
    });

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const dispatch = useDispatch();
    const { patientList, success, error, loading } = useSelector((state) => state.patientList);

    const {
        success: patientDeleteSuccess,
        error: patientDeleteError,
        loading: patientDeleteLoading
    } = useSelector((state) => state.patientDelete);

    const { success: patientAddSuccess, error: patientAddError, loading: patientAddLoading } = useSelector((state) => state?.patientAdd);

    const { success: patientEditSuccess, error: patientEditError, loading: patientEditLoading } = useSelector((state) => state.patientEdit);

    const handleCloseDeleteYes = () => {
        console.log(patientDeleteData);
        debugger;
        dispatch(patientDeleteAction(patientDeleteData._id));
        setOpenDelete(false);
    };

    const addPatientHandler = () => {
        setOpenModal(true);
        setEditPatient(false);
        setAddPatient(true);
        setInitialValues({
            name: '',
            assigneddomain: '',
            assignedemail: '',
            botFlowId: ''
        });
    };

    const handleEditClick = (e, p) => {
        setOpenModal(true);
        setAddPatient(false);
        setEditPatient(true);
        setInitialValues({
            name: p.name,
            assigneddomain: p.assigneddomain,
            assignedemail: p.assignedemail,
            botFlowId: p.botFlowId
        });
    };

    const handleDeleteClick = (e, p) => {
        e.preventDefault();

        setPatientDeleteData(p);

        setOpenDelete(true);
    };

    const handleClose = () => {
        setInitialValues({
            name: '',
            assigneddomain: '',
            assignedemail: '',
            botFlowId: ''
        });
        setOpenModal(false);
        setEditPatient(!editPatient);
        setAddPatient(!addPatient);
    };

    const handleChange = (newValue) => {
        setDate(newValue);
        if (editPatient) {
            setInitialValues({ ...initialValues, dateOfBirth: newValue });
        }
    };

    const rowData = patientList?.map((patient) => {
        return createData(
            patient.name,
            patient.assigneddomain,
            patient.assignedemail,
            patient.botFlowId,
            <span>
                <IconButton aria-label="update">
                    <EditIcon style={{ fill: '#008CBA' }} onClick={(event) => handleEditClick(event, patient)} />
                </IconButton>

                <IconButton aria-label="delete">
                    <DeleteIcon style={{ fill: '#a92920' }} onClick={(event) => handleDeleteClick(event, patient)} />
                </IconButton>
            </span>
        );
    });

    useEffect(() => {
        dispatch(patientListAction());
        if (patientAddSuccess || patientEditSuccess) {
            setOpenModal(false);
        }
    }, [dispatch, patientAddSuccess, patientEditSuccess, patientDeleteSuccess]);

    return (
        <>
            <LoadingWrapper loading={loading}>
                <Card>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <CardHeader title="Bots List" />
                        <CardActions>
                            <Button variant="contained" onClick={addPatientHandler}>
                                Add Bot
                            </Button>
                        </CardActions>
                    </div>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        {patientList && <CustomTable columns={columns} rows={rowData} />}
                    </Paper>
                </Card>
            </LoadingWrapper>
            {addPatient && (
                <CustomModal open={openModal} handleClose={handleClose}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={Yup.object({
                            name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
                            assigneddomain: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),

                            assignedemail: Yup.string().email('Invalid Email').required('Required!'),
                            botFlowId: Yup.string().min(1, 'Too Short!').max(15, 'Too Long!').required('Required')
                        })}
                        onSubmit={async (values, { setSubmitting, setErrors, setFieldValue }) => {
                            const formData = new FormData();
                            formData.append('name', values.name);
                            formData.append('assigneddomain', values.assigneddomain);

                            formData.append('assignedemail', values.assignedemail);
                            formData.append('botFlowId', values.botFlowId);

                            dispatch(patientAddAction(formData));
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
                                    <FormikField variant="outlined" type="text" name="assigneddomain" label="Assigned Domain" />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="email" name="assignedemail" label="Email" />
                                </Grid>

                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="text" name="botFlowId" label="Id" />
                                </Grid>

                                <Grid item xs={6}>
                                    <CustomButton fullWidth type="submit" title="Register" loading={patientAddLoading} />
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </CustomModal>
            )}

            {editPatient && (
                <CustomModal open={openModal} handleClose={handleClose}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={Yup.object({
                            name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
                            assigneddomain: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
                            assignedemail: Yup.string().email('Invalid Email').required('Required!'),
                            botFlowId: Yup.string().min(2, 'Too Short!').max(15, 'Too Long!').required('Required')
                        })}
                        onSubmit={async (values, { setSubmitting, setErrors, setFieldValue }) => {
                            const formData = new FormData();

                            formData.append('name', values.name);
                            formData.append('assigneddomain', values.assigneddomain);

                            formData.append('assignedemail', values.assignedemail);
                            // formData.append('botFlowId', values.botFlowId);
                            debugger;
                            dispatch(patientEditAction(values.botFlowId, formData));
                            debugger;
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
                                    <FormikField sx={{ mt: 3 }} variant="outlined" type="text" name="assigneddomain" label="Bot Domain" />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="email" name="assignedemail" label="Email" />
                                </Grid>

                                <Grid item xs={6}>
                                    <CustomButton fullWidth type="submit" title="Update" loading={patientEditLoading} />
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </CustomModal>
            )}
            <CustomDialogbox openDelete={openDelete} handleCloseDelete={handleCloseDelete} handleCloseDeleteYes={handleCloseDeleteYes} />
            {!loading && !patientList && (
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
