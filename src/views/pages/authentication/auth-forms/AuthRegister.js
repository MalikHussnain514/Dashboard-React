import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Divider, Grid, Typography, useMediaQuery } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

// project imports
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import FormikField from 'shared/components/form/FormikForm';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [showData, setShowData] = useState(null);

    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();

    const googleHandler = async () => {
        console.error('Register');
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

    const initialValues = {
        email: '',
        password: ''
    };

    console.log('the form data is here', showData);

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <AnimateButton>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={googleHandler}
                            size="large"
                            sx={{
                                color: 'grey.700',
                                backgroundColor: theme.palette.grey[50],
                                borderColor: theme.palette.grey[100]
                            }}
                        >
                            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
                            </Box>
                            Sign up with Google
                        </Button>
                    </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                        <Button
                            variant="outlined"
                            sx={{
                                cursor: 'unset',
                                m: 2,
                                py: 0.5,
                                px: 7,
                                borderColor: `${theme.palette.grey[100]} !important`,
                                color: `${theme.palette.grey[900]}!important`,
                                fontWeight: 500,
                                borderRadius: `${customization.borderRadius}px`
                            }}
                            disableRipple
                            disabled
                        >
                            OR
                        </Button>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign up with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                    fullName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
                    email: Yup.string().email('Invalid Email').required('Required!'),
                    address: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Required'),
                    phone: Yup.string().min(2, 'Too Short!').max(15, 'Too Long!').required('Required'),
                    patientId: Yup.string().min(2, 'Too Short!').max(15, 'Too Long!').required('Required'),
                    doctorId: Yup.string().min(2, 'Too Short!').max(15, 'Too Long').required('Required'),
                    hospitalName: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Required'),
                    password: Yup.string().min(8, 'Minimum 8 characters').max(16, 'Maximum 16 characters').required('Required!'),
                    passwordConfirmation: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Required!')
                })}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    const userData = {
                        fullName: values.fullName,
                        email: values.email,
                        address: values.address,
                        phone: values.phone,
                        patientId: values.patientId,
                        doctorId: values.doctorId,
                        hospitalName: values.hospitalName,
                        password: values.password,
                        passwordConfirmation: values.passwordConfirmation
                    };
                    setShowData(userData);
                }}
            >
                <Form className="d-flex flex-column">
                    <FormikField variant="outlined" type="text" name="fullName" label="Full Name" />

                    <FormikField sx={{ mt: 2 }} variant="outlined" type="email" name="email" label="Email" />

                    <FormikField sx={{ mt: 2 }} variant="outlined" type="text" name="address" label="Address" />

                    <FormikField sx={{ mt: 2 }} variant="outlined" type="phone" name="phone" label="Phone" />

                    <FormikField sx={{ mt: 2 }} variant="outlined" type="text" name="patientId" label="Patient Id" />

                    <FormikField sx={{ mt: 0.5 }} variant="outlined" type="text" name="doctorId" label="Doctor Id" />

                    <FormikField sx={{ mt: 2 }} variant="outlined" type="text" name="hospitalName" label="Hospital Name" />

                    <FormikField sx={{ mt: 2 }} variant="outlined" type="password" name="password" label="Password" />

                    <FormikField
                        sx={{ mt: 2 }}
                        variant="outlined"
                        type="password"
                        name="passwordConfirmation"
                        label="Password Confirmation"
                    />

                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
                                Sign Up
                            </Button>
                        </AnimateButton>
                    </Box>
                </Form>
            </Formik>
        </>
    );
};

export default FirebaseRegister;
