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
import {
    patientListAction,
    patientAddAction,
    patientDeleteAction,
    patientEditAction,
    allDoctorsAgainstPateintsAction,
    postDoctorsIdAction
} from '../../store/actions/patient';
import { doctorAction } from '../../store/actions/doctorAction';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardHeader,
    Checkbox,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    Typography
} from '@mui/material';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import FormikField from 'shared/components/form/FormikForm';
import { styled } from '@mui/material/styles';
import CustomButton from 'shared/components/button/CustomButton';
import { useTheme } from 'styled-components';
import CustomModal from 'shared/components/modal/CustomModal';

import './patient.css';
import LoadingWrapper from 'shared/components/loadingWrapper/LoadingWrapper';
import CustomDialogbox from 'shared/components/dialogbox/CustomDialogbox';

import TextField from '@mui/material/TextField';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const columns = [
    { id: 'profileimg', label: 'Profile Image', minWidth: 120, format: (value) => console.log(value) },
    { id: 'patientId', label: 'ID', minWidth: 120 },
    { id: 'patientName', label: 'Name', minWidth: 170, align: 'center' },
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
        id: 'patientAddress',
        label: 'Address',
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

function createData(profileimg, patientId, patientName, email, phoneNumber, patientAddress, action) {
    return { profileimg, patientId, patientName, email, phoneNumber, patientAddress, action };
}

const PatientList = () => {
    const theme = useTheme();
    const [patientDeleteData, setPatientDeleteData] = useState();
    const [img, setImg] = useState();
    const [imageState, setImageState] = useState();

    const [openDelete, setOpenDelete] = useState(false);

    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [addPatient, setAddPatient] = useState(false);
    const [editPatient, setEditPatient] = useState(false);

    const [initialValues, setInitialValues] = useState({
        profileimg: null,
        patientName: '',
        email: '',
        patientAddress: '',
        phoneNumber: '',
        patientId: '',
        doctorId: '',
        dateOfBirth: '',
        password: '',
        passwordConfirmation: ''
    });

    const [date, setDate] = useState(new Date());
    const [allDoctorData, setAllDoctorData] = useState([]);
    const [selectedDoctorData, setSelectedDoctorData] = useState([]);

    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const { doctorList } = useSelector((state) => state?.doctorList);

    const { allDoctorsId } = useSelector((state) => state?.allDoctorsId);

    const handleCloseDeleteYes = () => {
        dispatch(patientDeleteAction(patientDeleteData.patientId));
        setOpenDelete(false);
    };

    const getDoctorData = () => {
        const updatedArray = [];

        doctorList?.forEach((doctor) => {
            updatedArray.push({ doctorId: doctor.id, doctorName: doctor.doctorName });
        });
        setAllDoctorData(updatedArray);
    };

    const handleChangeId = (event) => {
        const {
            target: { value }
        } = event;

        setSelectedDoctorData(typeof value === 'string' ? value.split(',') : value);
    };
    const doctorsIDArray = [];
    if (selectedDoctorData?.length > 0) {
        selectedDoctorData?.forEach((doctor) => {
            doctorsIDArray.push(doctor.doctorId);
        });
    }

    const addPatientHandler = () => {
        setOpenModal(true);
        setEditPatient(false);
        setAddPatient(true);
        setInitialValues({
            profileimg: null,
            patientName: '',
            email: '',
            patientAddress: '',
            phoneNumber: '',
            patientId: '',
            doctorId: '',
            dateOfBirth: '',
            password: '',
            passwordConfirmation: ''
        });
        getDoctorData();
    };

    const getDoctorIdForEdit = (p) => {
        const editDoctorId = [];
        doctorList?.forEach((doctor) => {
            editDoctorId.push({ doctorId: doctor.id, doctorName: doctor.doctorName });
        });
        setAllDoctorData(editDoctorId);
        const result = editDoctorId.filter((doc) => {
            return allDoctorsId?.find((selected) => selected === doc.doctorId);
        });
        setSelectedDoctorData(result);
    };

    const handleEditClick = (e, p) => {
        dispatch(allDoctorsAgainstPateintsAction(p.patientId));

        setOpenModal(true);
        setImg(false);
        setAddPatient(false);
        setEditPatient(true);
        setInitialValues({
            profileimg: p.profileimg,
            patientName: p.patientName,
            email: p.email,
            patientAddress: p.patientAddress,
            phoneNumber: p.phoneNumber,
            patientId: p.patientId,

            dateOfBirth: p.dateOfBirth
        });

        setImageState(p.profileimg);
    };

    const handleDeleteClick = (e, p) => {
        e.preventDefault();

        setPatientDeleteData(p);
        setOpenDelete(true);
    };

    const handleClose = () => {
        setInitialValues({
            profileimg: null,
            patientName: '',
            email: '',
            patientAddress: '',
            phoneNumber: '',
            patientId: '',
            doctorId: '',
            dateOfBirth: '',
            password: '',
            passwordConfirmation: ''
        });
        setOpenModal(false);
        setEditPatient(!editPatient);
        setAddPatient(!addPatient);
        setImg(null);
        setSelectedDoctorData([]);
    };

    const handleChange = (newValue) => {
        setDate(newValue);
        if (editPatient) {
            setInitialValues({ ...initialValues, dateOfBirth: newValue });
        }
    };

    const rowData = patientList?.map((patient) => {
        return createData(
            <img style={{ width: '50px', height: '50px', borderRadius: '50%' }} src={patient.profileimg} alt={patient.profileimg} />,
            patient.patientId,
            patient.patientName,
            patient.email,
            patient.phoneNumber,
            patient.patientAddress,
            <span>
                <IconButton aria-label="delete">
                    <EditIcon style={{ fill: '#008CBA' }} onClick={(event) => handleEditClick(event, patient)} />
                </IconButton>

                <IconButton aria-label="delete">
                    <DeleteIcon style={{ fill: '#a92920' }} onClick={(event) => handleDeleteClick(event, patient)} />
                </IconButton>
            </span>
        );
    });

    useEffect(() => {
        getDoctorIdForEdit();
    }, [allDoctorsId]);

    useEffect(() => {
        dispatch(patientListAction());
        dispatch(doctorAction());
        if (patientAddSuccess || patientEditSuccess) {
            setOpenModal(false);
            setSelectedDoctorData([]);
            setImg(null);
            setIsSubmitting(false);
        }
    }, [dispatch, patientAddSuccess, patientEditSuccess, patientDeleteSuccess]);

    return (
        <>
            <LoadingWrapper loading={loading}>
                <Card>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <CardHeader title="Patient List" />
                        <CardActions>
                            <Button variant="contained" onClick={addPatientHandler}>
                                Add Patient
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
                            patientName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
                            email: Yup.string().email('Invalid Email').required('Required!'),
                            patientAddress: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Required'),
                            phoneNumber: Yup.string().min(2, 'Too Short!').max(15, 'Too Long!').required('Required'),
                            patientId: Yup.string().min(1, 'Too Short!').max(15, 'Too Long!').required('Required'),

                            password: Yup.string().min(8, 'Minimum 8 characters').max(16, 'Maximum 16 characters').required('Required!'),
                            passwordConfirmation: Yup.string()
                                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                                .required('Required!')
                        })}
                        onSubmit={async (values, { setSubmitting, setErrors, setFieldValue }) => {
                            setIsSubmitting(true);
                            const formData = new FormData();
                            formData.append('profileimg', imageState, imageState.name);
                            formData.append('patientName', values.patientName);

                            formData.append('email', values.email);
                            formData.append('patientAddress', values.patientAddress);
                            formData.append('phoneNumber', values.phoneNumber);
                            formData.append('patientId', values.patientId);

                            formData.append('dateOfBirth', date);

                            formData.append('password', values.password);
                            formData.append('passwordConfirmation', values.passwordConfirmation);

                            const doctorsArray = { doctorId: doctorsIDArray };
                            dispatch(postDoctorsIdAction(values.patientId, doctorsArray));
                            dispatch(patientAddAction(formData));
                        }}
                    >
                        <Form className="d-flex flex-column">
                            <h1 style={{ textAlign: 'center' }}>Patient SignUp</h1>
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
                                    <FormikField variant="outlined" type="text" name="patientName" label="Full Name" />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="email" name="email" label="Email" />
                                </Grid>

                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="text" name="patientAddress" label="Address" />
                                </Grid>

                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="phone" name="phoneNumber" label="Phone" />
                                </Grid>

                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="text" name="patientId" label="Patient Id" />
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl sx={{ mt: 2 }} fullWidth>
                                        <InputLabel id="demo-multiple-checkbox-label">Doctor ID</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            name="doctorId"
                                            multiple
                                            value={selectedDoctorData}
                                            onChange={handleChangeId}
                                            input={<OutlinedInput label="Tag" />}
                                            renderValue={(selected) => selected.map((x) => x.doctorName).join(',')}
                                        >
                                            {allDoctorData.map((doctor) => (
                                                <MenuItem key={doctor.doctorId} value={doctor}>
                                                    <Checkbox
                                                        checked={selectedDoctorData?.length > 0 && selectedDoctorData.indexOf(doctor) > -1}
                                                    />

                                                    <ListItemText primary={doctor.doctorId} />
                                                    <ListItemText primary={doctor.doctorName} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6} sx={{ mt: 2 }}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            label="Date of Birth"
                                            inputFormat="MM/dd/yyyy"
                                            name="dateOfBirth"
                                            value={date}
                                            onChange={handleChange}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
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
                            patientName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
                            email: Yup.string().email('Invalid Email').required('Required!'),
                            patientAddress: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Required'),
                            phoneNumber: Yup.string().min(2, 'Too Short!').max(15, 'Too Long!').required('Required'),
                            patientId: Yup.string().min(2, 'Too Short!').max(15, 'Too Long!').required('Required')
                        })}
                        onSubmit={async (values, { setSubmitting, setErrors, setFieldValue }) => {
                            const formData = new FormData();

                            {
                                imageState === initialValues?.profileimg && formData.append('profileimg', imageState);
                            }

                            {
                                imageState !== initialValues?.profileimg && formData.append('profileimg', imageState, imageState.name);
                            }

                            formData.append('patientName', values.patientName);

                            formData.append('email', values.email);
                            formData.append('patientAddress', values.patientAddress);
                            formData.append('phoneNumber', values.phoneNumber);
                            formData.append('patientId', values.patientId);
                            formData.append('dateOfBirth', date);
                            const doctorsArray = { doctorId: doctorsIDArray };
                            dispatch(postDoctorsIdAction(values.patientId, doctorsArray));
                            dispatch(patientEditAction(values.patientId, formData));
                        }}
                    >
                        <Form className="d-flex flex-column">
                            <h1 style={{ textAlign: 'center' }}>Patient Edit Form</h1>
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
                                                src={img || imageState}
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

                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 3 }} variant="outlined" type="text" name="patientName" label="Full Name" />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="email" name="email" label="Email" />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="text" name="patientAddress" label="Address" />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormikField sx={{ mt: 2 }} variant="outlined" type="phone" name="phoneNumber" label="Phone" />
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl sx={{ mt: 2 }} fullWidth>
                                        <InputLabel id="demo-multiple-checkbox-label">Doctor ID</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            name="doctorId"
                                            multiple
                                            value={selectedDoctorData}
                                            onChange={handleChangeId}
                                            input={<OutlinedInput label="Tag" />}
                                            renderValue={(selected) => selected.map((x) => x.doctorName).join(', ')}
                                        >
                                            {allDoctorData?.map((doctor) => {
                                                return (
                                                    <MenuItem key={doctor.doctorId} value={doctor}>
                                                        <Checkbox
                                                            checked={
                                                                selectedDoctorData.length > 0 && selectedDoctorData.indexOf(doctor) > -1
                                                            }
                                                        />

                                                        <ListItemText primary={doctor.doctorId} />
                                                        <ListItemText primary={doctor.doctorName} />
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6} sx={{ mt: 2 }}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            label="Date of Birth"
                                            inputFormat="MM/dd/yyyy"
                                            name="dateOfBirth"
                                            value={date}
                                            onChange={handleChange}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
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

export default PatientList;
