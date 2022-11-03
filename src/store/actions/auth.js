/* eslint-disable no-debugger */
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from '../constants/auth';
import { Axios } from 'utils/AxiosInstance';
import config from 'config';

export const login = (userData, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        });

        const url = `${config.SERVER_IP}/doctor/logindocto`;

        const { data } = await Axios.post(`${url}`, userData);
        localStorage.setItem('user', JSON.stringify(data));

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });
        navigate('/dashboard');
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error?.response && error?.response?.data?.Message
        });
    }
};
export const logout = (navigate) => (dispatch) => {
    dispatch({ type: USER_LOGOUT });
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
};
