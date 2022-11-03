/* eslint-disable no-debugger */
import {
    NURSES_LIST_REQUEST,
    NURSES_LIST_SUCCESS,
    NURSES_LIST_FAIL,
    NURSE_ADD_REQUEST,
    NURSE_ADD_SUCCESS,
    NURSE_ADD_FAIL,
    NURSES_EDIT_REQUEST,
    NURSES_EDIT_SUCCESS,
    NURSES_EDIT_FAIL,
    NURSES_DELETE_REQUEST,
    NURSES_DELETE_SUCCESS,
    NURSES_DELETE_FAIL
} from '../constants/nurses';
import { Axios } from 'utils/AxiosInstance';
import config from 'config';

export const nursesAction = () => async (dispatch) => {
    try {
        dispatch({
            type: NURSES_LIST_REQUEST
        });

        const url = `${config.SERVER_IP}/nurse/getallnurses`;

        const { data } = await Axios.get(`${url}`);
        console.log('im here in redux hit');
        dispatch({
            type: NURSES_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: NURSES_LIST_FAIL,
            payload: error?.response && error?.response?.data?.Message
        });
    }
};

export const nurseAddAction = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: NURSE_ADD_REQUEST
        });

        const url = `${config.SERVER_IP}/nurse/nurseregister`;

        const { data } = await Axios.post(`${url}`, userData);
        console.log('im here in redux hit');
        dispatch({
            type: NURSE_ADD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: NURSE_ADD_FAIL,
            payload: error?.response && error?.response?.data?.Message
        });
    }
};

export const nursesEditAction = (id, userData) => async (dispatch) => {
    try {
        dispatch({
            type: NURSES_EDIT_REQUEST
        });

        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        const url = `${config.SERVER_IP}/nurse/update/${id}`;

        const { data } = await Axios.put(`${url}`, userData, headers);
        console.log('im here in redux hit');
        dispatch({
            type: NURSES_EDIT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: NURSES_EDIT_FAIL,
            payload: error?.response && error?.response?.data?.Message
        });
    }
};

export const nursesDeleteAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: NURSES_DELETE_REQUEST
        });

        const url = `${config.SERVER_IP}/nurse/delete/${id}`;

        const { data } = await Axios.delete(`${url}`);
        console.log('im here in redux hit');
        dispatch({
            type: NURSES_DELETE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: NURSES_DELETE_FAIL,
            payload: error?.response && error?.response?.data?.Message
        });
    }
};
