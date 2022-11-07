import {
    EMAIL_LIST_REQUEST,
    EMAIL_LIST_SUCCESS,
    EMAIL_LIST_FAIL,
    EMAIL_DELETE_REQUEST,
    EMAIL_DELETE_SUCCESS,
    EMAIL_DELETE_FAIL
} from '../constants/email';

export const emailListReducer = (state = {}, action) => {
    switch (action.type) {
        case EMAIL_LIST_REQUEST:
            return { loading: true };
        case EMAIL_LIST_SUCCESS:
            return { loading: false, success: true, emailList: action.payload };
        case EMAIL_LIST_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};

export const emailDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case EMAIL_DELETE_REQUEST:
            return { loading: true };
        case EMAIL_DELETE_SUCCESS:
            return { loading: false, success: true, emailDelete: action.payload };
        case EMAIL_DELETE_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};
