/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-debugger */

import React, { useState } from 'react';
import Paper from '@mui/material/Paper';

import CustomTable from 'shared/components/table/CustomTable';
import { useSelector, useDispatch } from 'react-redux';
import { doctorAction, doctorAddAction, doctorDeleteAction, doctorEditAction } from '../../store/actions/doctorAction';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Button, Card, CardActions, CardHeader, Grid, IconButton, Input, Modal, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormikField from 'shared/components/form/FormikForm';
import { styled } from '@mui/material/styles';
import CustomModal from 'shared/components/modal/CustomModal';
import LoadingWrapper from 'shared/components/loadingWrapper/LoadingWrapper';
import CustomDialogbox from 'shared/components/dialogbox/CustomDialogbox';
import CustomButton from 'shared/components/button/CustomButton';
import '../patient/patient.css';

const columns = [
    { id: 'profileimg', label: 'Profile Image', minWidth: 120, format: (value) => console.log(value) },
    { id: 'id', label: 'ID', minWidth: 120 },
    { id: 'doctorName', label: 'Name', minWidth: 170 },
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

function createData(profileimg, id, doctorName, email, phoneNumber, address, hospital, action) {
    return { profileimg, id, doctorName, email, phoneNumber, address, hospital, action };
}

const DoctorList = () => {
    const [doctorDeleteData, setDoctorDeleteData] = useState();
    const [openDelete, setOpenDelete] = useState(false);
    const [img, setImg] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [addDoctor, setAddDoctor] = useState(false);
    const [editDoctor, setEditDoctor] = useState(false);
    const [open, setOpen] = useState(false);
    const [imageState, setImageState] = useState(null);

    const Input = styled('input')({
        display: 'none'
    });

    const [initialValues, setInitialValues] = useState({
        profileimg: null,
        doctorName: '',
        email: '',
        address: '',
        phoneNumber: '',
        hospital: '',
        doctorId: '',
        password: '',
        passwordConfirmation: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const dispatch = useDispatch();
    const { doctorList, success, error, loading } = useSelector((state) => state.doctorList);
    console.log('doctorList', doctorList);

    const {
        success: doctorDeleteSuccess,
        error: doctorDeleteError,
        loading: doctorDeleteLoading
    } = useSelector((state) => state.doctorDelete);

    const { success: doctorAddSuccess, error: doctorAddError, loading: doctorAddLoading } = useSelector((state) => state.doctorAdd);

    const { success: doctorEditSuccess, error: doctorEditError, loading: doctorEditLoading } = useSelector((state) => state.doctorEdit);

    const handleCloseDeleteYes = () => {
        console.log(doctorDeleteData.id);
        setOpenDelete(false);
        dispatch(doctorDeleteAction(doctorDeleteData.id));
    };

    const addDoctorHandler = () => {
        setOpenModal(true);
        setEditDoctor(false);
        setAddDoctor(true);
        setInitialValues({
            profileimg: null,
            doctorName: '',
            email: '',
            address: '',
            phoneNumber: '',
            hospital: '',
            doctorId: '',
            password: '',
            passwordConfirmation: ''
        });
    };

    const handleEditClick = (e, d) => {
        e.preventDefault();
        setInitialValues({
            profileimg: d.profileimg,
            doctorName: d.doctorName,
            email: d.email,
            address: d.address,
            phoneNumber: d.phoneNumber,
            hospital: d.hospital,
            doctorId: d.id
        });

        console.log(d);

        setOpenModal(true);
        setAddDoctor(false);
        setImageState(d.profileimg);
        setEditDoctor(true);
    };
    console.log('InitialValues', initialValues);

    const handleDeleteClick = (e, d) => {
        e.preventDefault();
        console.log(d);
        setDoctorDeleteData(d);
        setOpenDelete(true);
    };

    const handleClose = () => {
        setInitialValues({
            profileimg: null,
            doctorName: '',
            email: '',
            address: '',
            phoneNumber: '',
            hospital: '',
            doctorId: '',
            password: '',
            passwordConfirmation: ''
        });
        setOpenModal(false);
        setImg(null);
    };

    const rowData = doctorList?.map((doctor) => {
        return createData(
            <img style={{ width: '50px', height: '50px', borderRadius: '50%' }} src={doctor.profileimg} alt={doctor.profileimg} />,
            doctor.id,
            doctor.doctorName,
            doctor.email,
            doctor.phoneNumber ?? 'N/A',
            doctor.address ?? 'N/A',
            doctor.hospital ?? 'N/A',
            <span>
                <IconButton aria-label="delete">
                    <EditIcon style={{ fill: '#008CBA' }} onClick={(event) => handleEditClick(event, doctor)} />
                </IconButton>

                <IconButton aria-label="delete">
                    <DeleteIcon style={{ fill: '#a92920' }} onClick={(event) => handleDeleteClick(event, doctor)} />
                </IconButton>
            </span>
        );
    });

    React.useEffect(() => {
        dispatch(doctorAction());
        if (doctorAddSuccess || doctorEditSuccess) {
            setOpenModal(false);
            setImg(null);
            setIsSubmitting(false);
        }
    }, [dispatch, doctorAddSuccess, doctorEditSuccess, doctorDeleteSuccess]);
    return (
        <>
            <LoadingWrapper loading={loading}>
                <Card>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <CardHeader title="Doctor List" />
                        <CardActions>
                            <Button variant="contained" onClick={addDoctorHandler}>
                                Add Doctor
                            </Button>
                        </CardActions>
                    </div>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        {doctorList && <CustomTable columns={columns} rows={rowData} />}
                    </Paper>
                </Card>
            </LoadingWrapper>
            {addDoctor && (
                <CustomModal open={openModal} handleClose={handleClose}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={Yup.object({
                            doctorName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
                            email: Yup.string().email('Invalid Email').required('Required!'),
                            address: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Required'),
                            phoneNumber: Yup.string().min(2, 'Too Short!').max(15, 'Too Long!').required('Required'),
                            hospital: Yup.string().min(2, 'Too Short!').max(35, 'Too Long!').required('Required'),

                            password: Yup.string().min(2, 'Minimum 8 characters').max(16, 'Maximum 16 characters').required('Required!'),
                            passwordConfirmation: Yup.string()
                                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                                .required('Required!')
                        })}
                        onSubmit={async (values, { setSubmitting, setErrors, setFieldValue }) => {
                            setIsSubmitting(true);
                            const formData = new FormData();
                            formData.append('profileimg', imageState, imageState.name);
                            formData.append('doctorName', values.doctorName);
                            formData.append('email', values.email);
                            formData.append('address', values.address);
                            formData.append('phoneNumber', values.phoneNumber);
                            formData.append('hospital', values.hospital);
                            formData.append('password', values.password);
                            formData.append('passwordConfirmation', values.passwordConfirmation);
                            dispatch(doctorAddAction(formData));
                        }}
                    >
                        <Form className="d-flex flex-column">
                            <h1 style={{ textAlign: 'center' }}>Doctor SignUp</h1>

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

                                <Grid item xs={12}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="text" name="doctorName" label="Full Name" />
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
                                    <CustomButton fullWidth type="submit" title="Register" loading={doctorAddLoading} />
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </CustomModal>
            )}
            {editDoctor && (
                <CustomModal open={openModal} handleClose={handleClose}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={Yup.object({
                            doctorName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
                            email: Yup.string().email('Invalid Email').required('Required!'),
                            address: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Required'),
                            phoneNumber: Yup.string().min(2, 'Too Short!').max(15, 'Too Long!').required('Required'),
                            hospital: Yup.string().min(2, 'Too Short!').max(35, 'Too Long!').required('Required')
                        })}
                        onSubmit={async (values, { setSubmitting, setErrors, setFieldValue }) => {
                            const formData = new FormData();
                            {
                                imageState === initialValues?.profileimg && formData.append('profileimg', imageState);
                            }

                            {
                                imageState !== initialValues?.profileimg && formData.append('profileimg', imageState, imageState.name);
                            }

                            formData.append('doctorName', values.doctorName);
                            formData.append('email', values.email);
                            formData.append('address', values.address);
                            formData.append('phoneNumber', values.phoneNumber);
                            formData.append('hospital', values.hospital);

                            dispatch(doctorEditAction(values.doctorId, formData));
                        }}
                    >
                        <Form className="d-flex flex-column">
                            <h1 style={{ textAlign: 'center' }}>Doctor Edit Form</h1>

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
                                    <FormikField sx={{ mt: 3 }} variant="outlined" type="text" name="doctorName" label="Full Name" />
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
                                    <CustomButton fullWidth type="submit" title="Update" loading={doctorEditLoading} />
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </CustomModal>
            )}
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

export default DoctorList;
