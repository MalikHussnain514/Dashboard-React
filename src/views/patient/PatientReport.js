/* eslint-disable array-callback-return */
/* eslint-disable prettier/prettier */
/* eslint-disable no-debugger */
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Card, CardActionArea, CardHeader, CircularProgress, Typography, CardContent, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { borderRadius, Box } from '@mui/system';
import { useLocation, useNavigate } from 'react-router';
import SuccessIcon from '../../assets/images/Success-icon.png';
import LoadingWrapper from 'shared/components/loadingWrapper/LoadingWrapper';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

function createData(cycle, fillVolume, drainVolume, UF, fillTime, drainTime) {
    return { cycle, fillVolume, drainVolume, UF, fillTime, drainTime };
}

const AcccessibleTable = ({ route }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { patientId } = location?.state;

    const [singlePatientData, setSinglePatientData] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);
    const { patientList } = useSelector((state) => state?.patientList);
    useEffect(() => {
        patientList?.map((patient) => {
            if (patient?.patientId === patientId) {
                setSinglePatientData(patient);
            }
        });
    }, [patientId]);
    const patientReport = useSelector((state) => state?.patientReport);
    console.log(patientReport);
    const { loading } = patientReport;
    const report = patientReport?.patientReport;

    const rows = [];

    // eslint-disable-next-line no-unused-expressions
    report &&
        report?.cycles?.map((rep) => {
            console.log('report: ', rep);
            rows.push(createData(`Cycle ${rep?.cycle}`, rep?.fillVolume, rep?.drainVolume, rep?.UF, rep?.fillTime, rep?.drainTime));
        });

    const totalFillVolume = report?.cycles.map((a) => a.fillVolume).reduce((a, b) => a + b, 0) + report?.lastFill;
    const totalDrainVolume = report?.cycles.map((a) => a.drainVolume).reduce((a, b) => a + b, 0) + report?.initialDrain;
    const totalUF = report?.cycles.map((a) => a.UF).reduce((a, b) => a + b, 0);

    const convertTime = (newTime) => {
        const newDate = new Date(newTime).toString().split(' ');

        const currentTimezoneDateTime = newDate[4].split(':');
        let hh = currentTimezoneDateTime[0];

        const mm = currentTimezoneDateTime[1];

        const ampm = hh >= 12 ? 'pm' : 'am';

        // eslint-disable-next-line operator-assignment
        hh = hh % 12;
        // eslint-disable-next-line no-unneeded-ternary
        hh = hh ? hh : 12;
        const time = `${hh}:${mm > 9 ? '' : ''}${mm} ${ampm}`;

        return time;
    };

    return (
        <>
            <LoadingWrapper loading={loading}>
                <ArrowBackIcon onClick={() => navigate(-1)} />
                <div align="center" sx={{ width: '75%' }}>
                    <TableContainer sx={{ width: '100%', justifyContent: 'center', px: '3rem' }} component={Paper}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <CardHeader title="Patient Report" />
                        </div>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: 1,
                                paddingY: 2,
                                marginBottom: 2
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    paddingLeft: '1px',
                                    width: '40%'
                                }}
                            >
                                <Typography gutterBottom variant="h5" component="div">
                                    Patient ID : {singlePatientData?.patientId}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    Patient Name : {singlePatientData?.patientName}
                                </Typography>

                                <Typography gutterBottom variant="h5" component="div">
                                    Patient Address : {singlePatientData?.patientAddress}
                                </Typography>
                            </CardContent>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingRight: '1px' }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Start Time : {report?.startTime}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    End Time : {report?.endTime}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    Date : {location.state.time.slice(0, 17)}
                                    {convertTime(location.state.time)}
                                </Typography>
                                {report?.therapyDuration && (
                                    <Typography gutterBottom variant="h5" component="div">
                                        Therapy Duration : {report?.therapyDuration}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                        <Table sx={{ minWidth: 650, paddingX: 100 }} aria-label="caption table">
                            <TableHead>
                                <TableRow
                                    sx={{
                                        backgroundColor: '#D3D3D8'
                                    }}
                                >
                                    <TableCell>Cycle</TableCell>
                                    <TableCell align="center">Fill Volume(ml)</TableCell>
                                    <TableCell align="center">Drain Volume&nbsp;(ml)</TableCell>
                                    <TableCell align="center">UF/Cycle&nbsp;(ml)</TableCell>

                                    <TableCell align="center">Fill Time&nbsp;</TableCell>
                                    <TableCell align="center">Drain Time&nbsp;</TableCell>
                                    <TableCell align="center">Dwell Time&nbsp;</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Initial Drain
                                    </TableCell>
                                    <TableCell align="center">------</TableCell>
                                    <TableCell align="center">{report?.initialDrain}</TableCell>
                                    <TableCell align="center">------</TableCell>

                                    <TableCell align="center">------</TableCell>
                                    <TableCell align="center">
                                        {report?.initialDrainTime > 0 ? Math.floor(report?.initialDrainTime / 60) : 0} min
                                    </TableCell>

                                    <TableCell align="center">
                                        {' '}
                                        {report?.dwellTime > 0 ? Math.floor(report?.dwellTime / 60) : 0} min
                                    </TableCell>
                                </TableRow>

                                {rows?.map((cycle) => {
                                    console.log('Cycle: ', cycle);
                                    return (
                                        <>
                                            <TableRow key={cycle.cycle}>
                                                <TableCell component="th" scope="row">
                                                    {cycle.cycle}
                                                </TableCell>
                                                <TableCell align="center">{cycle.fillVolume}</TableCell>
                                                <TableCell align="center">{cycle.drainVolume}</TableCell>
                                                <TableCell align="center">{cycle.UF}</TableCell>

                                                <TableCell align="center">
                                                    {cycle.fillTime > 0 ? Math.floor(cycle.fillTime / 60) : 0} min
                                                </TableCell>

                                                <TableCell align="center">
                                                    {cycle.drainTime > 0 ? Math.floor(cycle.drainTime / 60) : 0} min
                                                </TableCell>
                                                <TableCell align="center">------</TableCell>
                                            </TableRow>
                                        </>
                                    );
                                })}
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Last Fill
                                    </TableCell>
                                    <TableCell align="center">{report?.lastFill}</TableCell>
                                    <TableCell align="center">------</TableCell>
                                    <TableCell align="center">------</TableCell>
                                    <TableCell align="center">
                                        {report?.lastFillTime > 0 ? Math.floor(report?.lastFillTime / 60) : 0} min
                                    </TableCell>
                                    <TableCell align="center">------</TableCell>
                                    <TableCell align="center">------</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Volume
                                    </TableCell>
                                    <TableCell component="th" scope="row" />
                                    <TableCell component="th" scope="row" />
                                    <TableCell component="th" scope="row" />
                                </TableRow>
                                <TableRow
                                    style={{
                                        backgroundColor: '#D3D3D8'
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        Total
                                    </TableCell>
                                    <TableCell align="center">{totalFillVolume || 0}</TableCell>
                                    <TableCell align="center">{totalDrainVolume || 0}</TableCell>
                                    <TableCell align="center">{totalUF || 0}</TableCell>
                                    <TableCell align="center">------</TableCell>
                                    <TableCell align="center">------</TableCell>
                                    <TableCell align="center">------</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Box sx={{ p: 2 }}>
                            <Typography
                                gutterBottom
                                variant="h4"
                                component="div"
                                sx={{
                                    width: '32%',
                                    padding: 1,
                                    marginY: 2,
                                    color: '#fff',
                                    borderRadius: 5,
                                    backgroundColor: report?.therapySuccess === 1 ? 'green' : 'red'
                                }}
                            >
                                {location?.state?.status}
                            </Typography>
                        </Box>
                    </TableContainer>
                </div>
            </LoadingWrapper>
        </>
    );
};

export default AcccessibleTable;
