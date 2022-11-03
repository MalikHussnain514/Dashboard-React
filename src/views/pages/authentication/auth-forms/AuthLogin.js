import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import FormikField from 'shared/components/form/FormikForm';
import { login } from 'store/actions/auth';
import CustomButton from 'shared/components/button/CustomButton';
import { useNavigate } from 'react-router';
import CustomSnackbar from 'shared/components/snackbar/CustomSnackbar';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showData, setShowData] = useState(null);
    const userLogin = useSelector((state) => state?.userLogin);
    const { loading, userInfo, success, error } = userLogin;
    console.log(success);
    console.log(error);

    console.log(userInfo);
    const initialValues = {
        email: '',
        password: ''
    };

    const handleClose = () => {
        setOpenSnackBar(false);
    };

    useEffect(() => {
        if (error) {
            setOpenSnackBar(true);
        }
    }, [error]);

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign in with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                    email: Yup.string().email('Invalid Email').required('Required!'),
                    password: Yup.string().min(4, 'Minimum 8 characters').max(16, 'Maximum 16 characters').required('Required!')
                })}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    const userData = {
                        email: values.email,
                        password: values.password
                    };
                    setShowData(userData);
                    dispatch(login(userData, navigate));
                }}
            >
                <Form className="d-flex flex-column">
                    <FormikField variant="outlined" type="email" name="email" label="Email" />
                    <FormikField sx={{ mt: 2 }} variant="outlined" type="password" name="password" label="Password" />

                    <CustomButton fullWidth type="submit" title="Sign In" loading={loading} />
                </Form>
            </Formik>
            <CustomSnackbar open={openSnackBar} handleClose={handleClose} severity={error && 'error'} message={error} />
        </>
    );
};

export default FirebaseLogin;
