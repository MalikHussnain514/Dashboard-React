import { FEEDBACK_LIST_REQUEST, FEEDBACK_LIST_SUCCESS, FEEDBACK_LIST_FAIL } from '../constants/feedback';

import { Axios } from 'utils/AxiosInstance';
import config from 'config';

export const feedbackListAction = () => async (dispatch) => {
    try {
        dispatch({
            type: FEEDBACK_LIST_REQUEST
        });

        const url = `${config.SERVER_IP}/feedback`;

        const { data } = await Axios.get(`${url}`);
        console.log('im here in redux hit');
        dispatch({
            type: FEEDBACK_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: FEEDBACK_LIST_FAIL,
            payload: error?.response && error?.response?.data?.Message
        });
    }
};
