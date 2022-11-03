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
    PATIENT_DELETE_FAIL,
    ALL_DOCTORS_AGAINST_PATIENT_REQUEST,
    ALL_DOCTORS_AGAINST_PATIENT_SUCCESS,
    ALL_DOCTORS_AGAINST_PATIENT_FAIL,
    POST_DOC_IDS_REQUEST,
    POST_DOC_IDS_SUCCESS,
    POST_DOC_IDS_FAIL
} from '../constants/patient';

import { Axios } from 'utils/AxiosInstance';
import config from 'config';

export const patientListAction = () => async (dispatch) => {
    try {
        dispatch({
            type: PATIENT_LIST_REQUEST
        });

        const url = `${config.SERVER_IP}/patient`;

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

export const allDoctorsAgainstPateintsAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_DOCTORS_AGAINST_PATIENT_REQUEST
        });

        const url = `${config.SERVER_IP}/patient/finddoctor/${id}`;

        const { data } = await Axios.get(`${url}`);

        dispatch({
            type: ALL_DOCTORS_AGAINST_PATIENT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ALL_DOCTORS_AGAINST_PATIENT_FAIL,
            payload: error?.response && error?.response?.data?.Message
        });
    }
};

export const postDoctorsIdAction = (id, userData) => async (dispatch) => {
    try {
        dispatch({
            type: POST_DOC_IDS_REQUEST
        });
        console.log('im here in redux hit post');
        const url = `${config.SERVER_IP}/patient/relationdoctor/${id}`;

        const { data } = await Axios.post(`${url}`, userData);

        dispatch({
            type: POST_DOC_IDS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: POST_DOC_IDS_FAIL,
            payload: error?.response && error?.response?.data?.Message
        });
    }
};

export const patientAddAction = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: PATIENT_ADD_REQUEST
        });
        console.log('im here in redux hit post');
        const url = `${config.SERVER_IP}/patient/registerpatient`;

        const { data } = await Axios.post(`${url}`, userData);

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
        const url = `${config.SERVER_IP}/patient/update/${id}`;

        const { data } = await Axios.put(`${url}`, userData, headers);

        console.log('im here in redux hit post');
        dispatch({
            type: PATIENT_EDIT_SUCCESS,
            payload: data
        });
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
        const url = `${config.SERVER_IP}/patient/delete/${id}`;

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
