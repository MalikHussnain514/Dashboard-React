/* eslint-disable no-debugger */
import {
    PATIENT_LIST_REQUEST,
    PATIENT_LIST_SUCCESS,
    PATIENT_LIST_FAIL,
    PATIENT_ADD_REQUEST,
    PATIENT_ADD_SUCCESS,
    PATIENT_ADD_FAIL,
    PATIENT_EDIT_REQUEST,
    PATIENT_EDIT_SUCCESS,
    PATIENT_EDIT_FAIL,
    PATIENT_DELETE_REQUEST,
    PATIENT_DELETE_SUCCESS,
    PATIENT_DELETE_FAIL
} from '../constants/patient';

import { Axios } from 'utils/AxiosInstance';

export const patientListAction = () => async (dispatch) => {
    try {
        dispatch({
            type: PATIENT_LIST_REQUEST
        });

        const url = `https://voice-bot-backend.herokuapp.com/api/bot`;

        const { data } = await Axios.get(`${url}`);

        dispatch({
            type: PATIENT_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: PATIENT_LIST_FAIL,
            payload: error?.response && error?.response?.data?.Message
        });
    }
};

export const patientAddAction = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: PATIENT_ADD_REQUEST
        });
        // console.log('im here in redux hit post');
        const url = `https://voice-bot-backend.herokuapp.com/api/bot`;

        const { data } = await Axios.post(`${url}`, userData);
        debugger;

        console.log('im here in redux hit post');
        dispatch({
            type: PATIENT_ADD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: PATIENT_ADD_FAIL,
            payload: error?.response && error?.response?.data?.Message
        });
    }
};

export const patientEditAction = (id, userData) => async (dispatch) => {
    try {
        dispatch({
            type: PATIENT_EDIT_REQUEST
        });

        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        console.log('im here in redux hit post');
        const url = `https://voice-bot-backend.herokuapp.com/api/bot/${id}`;

        const { data } = await Axios.put(`${url}`, userData, headers);
        debugger;

        console.log('im here in redux hit post');
        dispatch({
            type: PATIENT_EDIT_SUCCESS,
            payload: data
        });
        debugger;
    } catch (error) {
        dispatch({
            type: PATIENT_EDIT_FAIL,
            payload: error?.response && error?.response?.data?.Message
        });
    }
};

export const patientDeleteAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PATIENT_DELETE_REQUEST
        });
        console.log('im here in redux hit post');
        const url = `https://voice-bot-backend.herokuapp.com/api/bot/${id}`;

        const { data } = await Axios.delete(`${url}`);

        console.log('im here in redux hit post');
        dispatch({
            type: PATIENT_DELETE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: PATIENT_DELETE_FAIL,
            payload: error?.response && error?.response?.data?.Message
        });
    }
};
