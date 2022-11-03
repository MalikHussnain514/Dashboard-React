import {
    DOCTOR_LIST_REQUEST,
    DOCTOR_LIST_SUCCESS,
    DOCTOR_LIST_FAIL,
    DOCTOR_ADD_REQUEST,
    DOCTOR_ADD_SUCCESS,
    DOCTOR_ADD_FAIL,
    DOCTOR_EDIT_REQUEST,
    DOCTOR_EDIT_SUCCESS,
    DOCTOR_EDIT_FAIL,
    DOCTOR_DELETE_REQUEST,
    DOCTOR_DELETE_SUCCESS,
    DOCTOR_DELETE_FAIL
} from '../constants/doctor';
import { Axios } from 'utils/AxiosInstance';
import config from 'config';

export const doctorAction = () => async (dispatch) => {
    try {
        dispatch({
            type: DOCTOR_LIST_REQUEST
        });

        const url = `${config.SERVER_IP}/doctor/getalldatadoctor`;

        const { data } = await Axios.get(`${url}`);
        console.log('im here in redux hit');
        dispatch({
            type: DOCTOR_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: DOCTOR_LIST_FAIL,
            payload: error?.response && error?.response?.data?.Message
        });
    }
};

export const doctorAddAction = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: DOCTOR_ADD_REQUEST
        });

        const url = `${config.SERVER_IP}/doctor/doctorregister`;

        const { data } = await Axios.post(`${url}`, userData);
        console.log('im here in redux hit');
        dispatch({
            type: DOCTOR_ADD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: DOCTOR_ADD_FAIL,
            payload: error?.response && error?.response?.data?.Message
        });
    }
};

export const doctorEditAction = (id, userData) => async (dispatch) => {
    try {
        dispatch({
            type: DOCTOR_EDIT_REQUEST
        });

        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        const url = `${config.SERVER_IP}/doctor/update/${id}`;

        const { data } = await Axios.put(`${url}`, userData, headers);
        console.log('im here in redux hit');
        dispatch({
            type: DOCTOR_EDIT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: DOCTOR_EDIT_FAIL,
            payload: error?.response && error?.response?.data?.Message
        });
    }
};

export const doctorDeleteAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DOCTOR_DELETE_REQUEST
        });

        const url = `${config.SERVER_IP}/doctor/delete/${id}`;

        const { data } = await Axios.delete(`${url}`);
        console.log('im here in redux hit');
        dispatch({
            type: DOCTOR_DELETE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: DOCTOR_DELETE_FAIL,
            payload: error?.response && error?.response?.data?.Message
        });
    }
};
