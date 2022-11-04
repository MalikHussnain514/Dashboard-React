import {
    DOCTOR_LIST_REQUEST,
    DOCTOR_LIST_SUCCESS,
    DOCTOR_LIST_FAIL,
    DOCTOR_DELETE_REQUEST,
    DOCTOR_DELETE_SUCCESS,
    DOCTOR_DELETE_FAIL
} from '../constants/doctor';
import { Axios } from 'utils/AxiosInstance';

export const doctorAction = () => async (dispatch) => {
    try {
        dispatch({
            type: DOCTOR_LIST_REQUEST
        });

        const url = `https://voice-bot-backend.herokuapp.com/api/bot/getmail`;

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

export const doctorDeleteAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DOCTOR_DELETE_REQUEST
        });

        const url = `https://voice-bot-backend.herokuapp.com/api/bot/getmail/${id}`;

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
