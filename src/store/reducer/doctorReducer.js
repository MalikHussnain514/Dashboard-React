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

export const doctorListReducer = (state = {}, action) => {
    switch (action.type) {
        case DOCTOR_LIST_REQUEST:
            return { loading: true };
        case DOCTOR_LIST_SUCCESS:
            return { loading: false, success: true, doctorList: action.payload };
        case DOCTOR_LIST_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};

export const doctorAddReducer = (state = {}, action) => {
    switch (action.type) {
        case DOCTOR_ADD_REQUEST:
            return { loading: true };
        case DOCTOR_ADD_SUCCESS:
            return { loading: false, success: true, doctorAdd: action.payload };
        case DOCTOR_ADD_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};

export const doctorEditReducer = (state = {}, action) => {
    switch (action.type) {
        case DOCTOR_EDIT_REQUEST:
            return { loading: true };
        case DOCTOR_EDIT_SUCCESS:
            return { loading: false, success: true, doctorEdit: action.payload };
        case DOCTOR_EDIT_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};

export const doctorDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DOCTOR_DELETE_REQUEST:
            return { loading: true };
        case DOCTOR_DELETE_SUCCESS:
            return { loading: false, success: true, doctorDelete: action.payload };
        case DOCTOR_DELETE_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};
