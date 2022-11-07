import {
    EMAIL_LIST_REQUEST,
    EMAIL_LIST_SUCCESS,
    EMAIL_LIST_FAIL,
    EMAIL_DELETE_REQUEST,
    EMAIL_DELETE_SUCCESS,
    EMAIL_DELETE_FAIL
} from '../constants/email';
import { Axios } from 'utils/AxiosInstance';

export const emailAction = () => async (dispatch) => {
    try {
        dispatch({
            type: EMAIL_LIST_REQUEST
        });

        const url = `https://voice-bot-backend.herokuapp.com/api/bot/getmail`;

        const { data } = await Axios.get(`${url}`);
        dispatch({
            type: EMAIL_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: EMAIL_LIST_FAIL,
            payload: error?.response && error?.response?.data?.Message
        });
    }
};

export const emailDeleteAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: EMAIL_DELETE_REQUEST
        });

        const url = `https://voice-bot-backend.herokuapp.com/api/bot/getmail/${id}`;

        const { data } = await Axios.delete(`${url}`);
        dispatch({
            type: EMAIL_DELETE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: EMAIL_DELETE_FAIL,
            payload: error?.response && error?.response?.data?.Message
        });
    }
};
