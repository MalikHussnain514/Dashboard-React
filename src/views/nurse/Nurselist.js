/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-debugger */

import React, { useState } from 'react';
import Paper from '@mui/material/Paper';

import { useSelector, useDispatch } from 'react-redux';
import { nursesAction, nurseAddAction, nursesEditAction, nursesDeleteAction } from '../../store/actions/nursesAction';
import { Avatar, Button, Card, CardActions, CardHeader, CircularProgress, Grid, IconButton, Modal, Stack, Typography } from '@mui/material';
import CustomTable from 'shared/components/table/CustomTable';
import { Form, Formik } from 'formik';
import FormikField from 'shared/components/form/FormikForm';
import { styled } from '@mui/material/styles';
import * as Yup from 'yup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomModal from 'shared/components/modal/CustomModal';
import LoadingWrapper from 'shared/components/loadingWrapper/LoadingWrapper';
import CustomDialogbox from 'shared/components/dialogbox/CustomDialogbox';
import CustomButton from 'shared/components/button/CustomButton';
import '../patient/patient.css';

const columns = [
    { id: 'profileimg', label: 'Profile Image', minWidth: 120, format: (value) => console.log(value) },
    { id: 'patientId', label: 'ID', minWidth: 100 },
    { id: 'nurseName', label: 'Name', align: 'center', minWidth: 170 },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'phoneNumber',
        label: 'Phone',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'address',
        label: 'Address',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'hospital',
        label: 'Hospital',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(2)
    }
];

function createData(profileimg, patientId, nurseName, email, phoneNumber, address, hospital, action) {
    return { profileimg, patientId, nurseName, email, phoneNumber, address, hospital, action };
}

const NurseList = () => {
    const [nurseDeleteData, setNurseDeleteData] = useState();
    const [openDelete, setOpenDelete] = useState(false);
    const [img, setImg] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [addNurse, setAddNurse] = useState(false);
    const [editNurse, setEditNurse] = useState(false);
    const [open, setOpen] = useState(false);
    const [imageState, setImageState] = useState(null);

    const Input = styled('input')({
        display: 'none'
    });

    const [initialValues, setInitialValues] = useState({
        profileimg: null,
        nurseName: '',
        patientId: '',
        email: '',
        phoneNumber: '',
        hospital: '',
        address: '',
        password: '',
        passwordConfirmation: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const dispatch = useDispatch();
    const { nursesList, success, error, loading } = useSelector((state) => state.nursesList);
    console.log('nursesList', nursesList);

    const handleCloseDeleteYes = () => {
        console.log(nurseDeleteData.id);

        dispatch(nursesDeleteAction(nurseDeleteData.id));
        setOpenDelete(false);
    };

    const {
        success: nurseDeleteSuccess,
        error: nurseDeleteError,
        loading: nurseDeleteLoading
    } = useSelector((state) => state.nursesDelete);

    const { success: nurseAddSuccess, error: nurseAddError, loading: nurseAddLoading } = useSelector((state) => state.nursesAdd);
    console.log(nurseAddLoading);
    const { success: nurseEditSuccess, error: nurseEditError, loading: nurseEditLoading } = useSelector((state) => state.nursesEdit);

    const addNurseHandler = () => {
        setOpenModal(true);
        setEditNurse(false);
        setAddNurse(true);
        setInitialValues({
            profileimg: null,
            nurseName: '',
            patientId: '',
            email: '',
            phoneNumber: '',
            hospital: '',
            address: '',
            password: '',
            passwordConfirmation: ''
        });
    };

    const handleEditClick = (e, n) => {
        e.preventDefault();
        setInitialValues({
            nurseId: n.id,
            profileimg: n.profileimg,
            nurseName: n.nurseName,
            email: n.email,
            address: n.address,
            phoneNumber: n.phoneNumber,
            hospital: n.hospital
        });

        console.log(n);

        setOpenModal(true);
        setAddNurse(false);
        setImageState(n.profileimg);
        setEditNurse(true);
    };

    const handleDeleteClick = (e, n) => {
        e.preventDefault();
        console.log(n);
        setNurseDeleteData(n);
        setOpenDelete(true);
    };

    const handleClose = () => {
        setInitialValues({
            profileimg: null,
            nurseName: '',
            patientId: '',
            email: '',
            phoneNumber: '',
            hospital: '',
            address: '',
            password: '',
            passwordConfirmation: ''
        });
        setOpenModal(false);
        setImg(null);
    };

    const rowData = nursesList?.map((nurse) => {
        return createData(
            <img style={{ width: '50px', height: '50px', borderRadius: '50%' }} src={nurse.profileimg} alt={nurse.profileimg} />,
            nurse.id,
            nurse.nurseName,
            nurse.email,
            nurse.phoneNumber ?? 'N/A',
            nurse.address ?? 'N/A',
            nurse.hospital ?? 'N/A',
            <span>
                <IconButton aria-label="delete">
                    <EditIcon style={{ fill: '#008CBA' }} onClick={(event) => handleEditClick(event, nurse)} />
                </IconButton>

                <IconButton aria-label="delete">
                    <DeleteIcon style={{ fill: '#a92920' }} onClick={(event) => handleDeleteClick(event, nurse)} />
                </IconButton>
            </span>
        );
    });

    React.useEffect(() => {
        dispatch(nursesAction());
        if (nurseAddSuccess || nurseEditSuccess) {
            setOpenModal(false);
            setImg(null);
            setIsSubmitting(false);
        }
    }, [dispatch, nurseAddSuccess, nurseEditSuccess, nurseDeleteSuccess]);

    return (
        <>
            <LoadingWrapper loading={loading}>
                <Card>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <CardHeader title="Nurses List" />
                        <CardActions>
                            <Button variant="contained" onClick={addNurseHandler}>
                                Add Nurse
                            </Button>
                        </CardActions>
                    </div>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        {nursesList && <CustomTable columns={columns} rows={rowData} />}
                    </Paper>
                </Card>
            </LoadingWrapper>
            {addNurse && (
                <CustomModal open={openModal} handleClose={handleClose}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={Yup.object({
                            nurseName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
                            patientId: Yup.string().min(2, 'Too Short!').max(15, 'Too Long!').required('Required'),
                            email: Yup.string().email('Invalid Email').required('Required!'),
                            address: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Required'),
                            phoneNumber: Yup.string().min(2, 'Too Short!').max(15, 'Too Long!').required('Required'),
                            hospital: Yup.string().min(1, 'Too Short!').max(15, 'Too Long').required('Required'),
                            password: Yup.string().min(8, 'Minimum 8 characters').max(16, 'Maximum 16 characters').required('Required!'),
                            passwordConfirmation: Yup.string()
                                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                                .required('Required!')
                        })}
                        onSubmit={async (values, { setSubmitting, setErrors, setFieldValue }) => {
                            setIsSubmitting(true);
                            const formData = new FormData();
                            formData.append('profileimg', imageState, imageState.name);
                            formData.append('nurseName', values.nurseName);
                            formData.append('patientId', values.patientId);
                            formData.append('email', values.email);
                            formData.append('address', values.address);
                            formData.append('phoneNumber', values.phoneNumber);
                            formData.append('hospital', values.hospital);
                            formData.append('password', values.password);
                            formData.append('passwordConfirmation', values.passwordConfirmation);

                            dispatch(nurseAddAction(formData));

                            console.log('form data in state is here', formData);
                        }}
                    >
                        <Form className="d-flex flex-column">
                            <h1 style={{ textAlign: 'center' }}>Nurse SignUp</h1>

                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Input
                                        accept="image/*"
                                        id="icon-button-file"
                                        name="profileimg"
                                        type="file"
                                        onChange={(event) => {
                                            const file = event.target.files[0];
                                            const reader = new FileReader();
                                            const url = reader.readAsDataURL(file);
                                            reader.onloadend = function (e) {
                                                setImg(reader.result);
                                            }.bind();
                                            setImageState(file);
                                        }}
                                    />
                                    <label htmlFor="icon-button-file">
                                        <IconButton aria-label="upload picture" component="span">
                                            <Avatar
                                                sx={{ width: '100px', height: '100px' }}
                                                src={img && img}
                                                imgProps={{
                                                    width: '240px'
                                                }}
                                                aria-controls={open ? 'menu-list-grow' : undefined}
                                                aria-haspopup="true"
                                                color="inherit"
                                            />
                                        </IconButton>
                                        {!imageState && isSubmitting && (
                                            <Typography variant="body1" color="red" align="center">
                                                This field is required
                                            </Typography>
                                        )}
                                    </label>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="text" name="nurseName" label="Full Name" />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="text" name="patientId" label="Patient Id" />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="email" name="email" label="Email" />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="text" name="address" label="Address" />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="phone" name="phoneNumber" label="Phone" />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="text" name="hospital" label="Hospital" />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="password" name="password" label="Password" />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormikField
                                        sx={{ mt: 2 }}
                                        variant="outlined"
                                        type="password"
                                        name="passwordConfirmation"
                                        label="Password Confirmation"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <CustomButton fullWidth type="submit" title="Register" loading={nurseAddLoading} />
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </CustomModal>
            )}

            {editNurse && (
                <CustomModal open={openModal} handleClose={handleClose}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={Yup.object({
                            nurseName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
                            email: Yup.string().email('Invalid Email').required('Required!'),
                            address: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Required'),
                            phoneNumber: Yup.string().min(2, 'Too Short!').max(15, 'Too Long!').required('Required'),
                            hospital: Yup.string().min(1, 'Too Short!').max(15, 'Too Long').required('Required')
                        })}
                        onSubmit={async (values, { setSubmitting, setErrors, setFieldValue }) => {
                            console.log(values);
                            const formData = new FormData();
                            {
                                imageState === initialValues?.profileimg && formData.append('profileimg', imageState);
                            }

                            {
                                imageState !== initialValues?.profileimg && formData.append('profileimg', imageState, imageState.name);
                            }

                            formData.append('nurseName', values.nurseName);

                            formData.append('email', values.email);
                            formData.append('address', values.address);
                            formData.append('phoneNumber', values.phoneNumber);
                            formData.append('hospital', values.hospital);

                            dispatch(nursesEditAction(values.nurseId, formData));
                            console.log('Edit the data is here', formData);
                        }}
                    >
                        <Form className="d-flex flex-column">
                            <h1 style={{ textAlign: 'center' }}>Nurse Edit Form</h1>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Input
                                        accept="image/*"
                                        id="icon-button-file"
                                        name="profileimg"
                                        type="file"
                                        onChange={(event) => {
                                            const file = event.target.files[0];
                                            const reader = new FileReader();
                                            const url = reader.readAsDataURL(file);
                                            reader.onloadend = function (e) {
                                                setImg(reader.result);
                                                setInitialValues({ profileimg: reader.result });
                                            }.bind();
                                            setImageState(file);
                                            console.log(initialValues);
                                        }}
                                    />
                                    <label htmlFor="icon-button-file">
                                        <IconButton aria-label="upload picture" component="span">
                                            <Avatar
                                                sx={{ width: '100px', height: '100px' }}
                                                src={initialValues?.profileimg}
                                                imgProps={{
                                                    width: '240px'
                                                }}
                                                aria-controls={open ? 'menu-list-grow' : undefined}
                                                aria-haspopup="true"
                                                color="inherit"
                                            />
                                        </IconButton>
                                    </label>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormikField sx={{ mt: 3 }} variant="outlined" type="text" name="nurseName" label="Full Name" />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="email" name="email" label="Email" />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="text" name="address" label="Address" />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="phone" name="phoneNumber" label="Phone" />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="text" name="hospital" label="Hospital" />
                                </Grid>
                                <Grid item xs={6}>
                                    <CustomButton fullWidth type="submit" title="Update" loading={nurseEditLoading} />
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </CustomModal>
            )}
            <CustomDialogbox openDelete={openDelete} handleCloseDelete={handleCloseDelete} handleCloseDeleteYes={handleCloseDeleteYes} />
            {!loading && !nursesList && (
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

export default NurseList;
