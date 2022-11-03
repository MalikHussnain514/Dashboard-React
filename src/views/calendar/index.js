/* eslint-disable object-shorthand */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable dot-notation */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */

// import React from 'react';
import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { use } from 'react-router';
import { PatientReportAction, PatientReportListOnDate, patientListAction } from 'store/actions/patient';
import { CircularProgress, FormControl, Grid, InputLabel, MenuItem, Popover, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Loader from 'ui-component/Loader';
// import styled from 'styled-components';

// project imports

// ==============================|| Calender Page ||============================== //

const CalendarPage = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const oldText = useRef('');
    const history = useLocation();

    // patient list
    const { patientList } = useSelector((state) => state?.patientList);

    const patientLoading = useSelector((state) => state?.patientList?.loading);

    const patientReportDateList = useSelector((state) => state?.patientReportListDate?.patientReportList);
    const loading = useSelector((state) => state?.patientReportListDate?.loading);
    const [patientId, setPatientId] = React.useState(() => {
        const sessionId = sessionStorage.getItem('patient-id');
        if (sessionId) {
            return sessionId;
        }
        return 'AAA';
    });

    useEffect(() => {
        dispatch(patientListAction());
        dispatch(PatientReportListOnDate(patientId));
    }, [dispatch, patientId]);

    useEffect(() => {
        sessionStorage.setItem('patient-id', patientId);
    }, [patientId]);

    const convertTime = (newTime) => {
        const newDate = new Date(newTime).toString().split(' ');
        const currentTimezoneDateTime = newDate[4].split(':');
        let hh = currentTimezoneDateTime[0];
        const mm = currentTimezoneDateTime[1];

        // eslint-disable-next-line operator-assignment
        hh = hh % 24;

        let newh = hh < 10 ? `0${hh}` : `${hh}`;
        newh = newh ? newh : 24;

        const time = `${newh}:${mm}`;

        return time;
    };

    const calenderData = [];
    const successMessage = 'Therapy Successful';
    patientReportDateList?.forEach((item) => {
        item?.reports?.forEach((report) => {
            const obj = {};

            const err = report?.message?.split(' ');
            err.shift();
            const error = err.join(' ');
            obj['date'] = item.date;
            report.message === '' ? (obj['title'] = successMessage) : (obj['title'] = error.toLowerCase());
            obj['time'] = report.time;
            obj['description'] = report?.message === 'Success' ? successMessage : report?.message;
            obj['UF'] = report.UF;
            obj['color'] = report.status === 'Failed' ? '#ff0000' : '#22c55e';
            obj['orderStatus'] = report?.status;
            obj['start'] = obj['date'] + 'T'.concat(convertTime(report.time));

            calenderData.push(obj);
        });
    });

    const calendarOptions = {
        events: calenderData || [],
        plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
        dayMaxEvents: 2,
        eventClick({ event: clickedEvent }) {
            // eslint-disable-next-line no-underscore-dangle
            const time = clickedEvent._def.extendedProps.time;
            dispatch(PatientReportAction(patientId, time));

            // eslint-disable-next-line no-underscore-dangle
            // eslint-disable-next-line object-shorthand
            navigate('/patientreport', {
                state: { status: clickedEvent._def.title, time: time, patientId: patientId }
            });
        }
    };
    const handleChange = (event) => {
        setPatientId(event.target.value);
    };

    // eslint-disable-next-line react/jsx-boolean-value
    return (
        <div>
            {loading && <Loader />}
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {!patientLoading && (
                    <Grid
                        item
                        xs={2}
                        sx={{
                            paddingY: 4
                        }}
                    >
                        <Typography fontSize={24} fontWeight={800} sx={{ paddingBottom: 3 }}>
                            Select Patient
                        </Typography>
                        <FormControl sx={{ width: '100%' }} size="small">
                            <InputLabel id="demo-simple-select-autowidth-label">Select Patient</InputLabel>
                            <Select
                                id="demo-simple-select-autowidth-label"
                                labelId="demo-simple-select-autowidth-label"
                                label="Select Patient"
                                value={patientId}
                                onChange={handleChange}
                            >
                                {patientList &&
                                    patientList?.map((patient) => (
                                        <MenuItem value={patient.patientId} key={patient.id}>
                                            {patient.patientName}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                )}
                {!loading && (
                    <Grid item xs={10}>
                        <FullCalendar {...calendarOptions} />
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default CalendarPage;
