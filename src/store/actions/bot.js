/* eslint-disable no-debugger */
import {
    BOT_LIST_REQUEST,
    BOT_LIST_SUCCESS,
    BOT_LIST_FAIL,
    BOT_ADD_REQUEST,
    BOT_ADD_SUCCESS,
    BOT_ADD_FAIL,
    BOT_EDIT_REQUEST,
    BOT_EDIT_SUCCESS,
    BOT_EDIT_FAIL,
    BOT_DELETE_REQUEST,
    BOT_DELETE_SUCCESS,
    BOT_DELETE_FAIL
} from '../constants/bot';

import { Axios } from 'utils/AxiosInstance';

export const botListAction = () => async (dispatch) => {
    try {
        dispatch({
            type: BOT_LIST_REQUEST
        });

        const url = `https://voice-bot-backend.herokuapp.com/api/bot`;

        const { data } = await Axios.get(`${url}`);

        dispatch({
            type: BOT_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: BOT_LIST_FAIL,
            payload: error?.response && error?.response?.data?.message
        });
    }
};

export const botAddAction = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: BOT_ADD_REQUEST
        });
        const url = `https://voice-bot-backend.herokuapp.com/api/bot`;

        const { data } = await Axios.post(`${url}`, userData);

        dispatch({
            type: BOT_ADD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: BOT_ADD_FAIL,
            payload: error?.response && error?.response?.data?.message
        });
    }
};

export const botEditAction = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: BOT_EDIT_REQUEST
        });

        const headers = {
            'Content-Type': 'application/json'
        };

        console.log('im here in redux hit post');
        const url = `https://voice-bot-backend.herokuapp.com/api/bot/${userData._id}`;

        const { data } = await Axios.put(`${url}`, userData, headers);

        dispatch({
            type: BOT_EDIT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: BOT_EDIT_FAIL,
            payload: error?.response && error?.response?.data?.message
        });
    }
};

export const botDeleteAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: BOT_DELETE_REQUEST
        });
        const url = `https://voice-bot-backend.herokuapp.com/api/bot/${id}`;

        const { data } = await Axios.delete(`${url}`);

        dispatch({
            type: BOT_DELETE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: BOT_DELETE_FAIL,
            payload: error?.response && error?.response?.data?.message
        });
    }
};
