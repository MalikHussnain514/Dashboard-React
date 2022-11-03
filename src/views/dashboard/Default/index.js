import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constants/constant';
import CustomSnackbar from 'shared/components/snackbar/CustomSnackbar';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const dispatch = useDispatch();
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const userLogin = useSelector((state) => state?.userLogin);
    const { success } = userLogin;
    console.log(success);
    const [isLoading, setLoading] = useState(true);
    const handleClose = () => {
        setOpenSnackBar(false);
    };

    useEffect(() => {
        if (success) {
            setOpenSnackBar(true);
        }
        setLoading(false);
        return () => {
            dispatch({ type: 'USER_LOGIN_RESET' });
        };
    }, [success]);

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <EarningCard isLoading={isLoading} />
                        </Grid>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <TotalOrderLineChartCard isLoading={isLoading} />
                        </Grid>
                        <Grid item lg={4} md={12} sm={12} xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item sm={6} xs={12} md={6} lg={12}>
                                    <TotalIncomeDarkCard isLoading={isLoading} />
                                </Grid>
                                <Grid item sm={6} xs={12} md={6} lg={12}>
                                    <TotalIncomeLightCard isLoading={isLoading} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={8}>
                            <TotalGrowthBarChart isLoading={isLoading} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <PopularCard isLoading={isLoading} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <CustomSnackbar
                open={openSnackBar}
                handleClose={handleClose}
                severity={success && 'success'}
                message={success && 'Logged In Successfully!'}
            />
        </>
    );
};

export default Dashboard;
