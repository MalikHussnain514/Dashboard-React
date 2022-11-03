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

export const patientListReducer = (state = {}, action) => {
    switch (action.type) {
        case PATIENT_LIST_REQUEST:
            return { loading: true };
        case PATIENT_LIST_SUCCESS:
            return { loading: false, success: true, patientList: action.payload };
        case PATIENT_LIST_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};

export const allDoctorsAgainstPateintsReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_DOCTORS_AGAINST_PATIENT_REQUEST:
            return { loading: true };
        case ALL_DOCTORS_AGAINST_PATIENT_SUCCESS:
            return { loading: false, success: true, allDoctorsId: action.payload };
        case ALL_DOCTORS_AGAINST_PATIENT_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};

export const postDoctorsIdReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_DOC_IDS_REQUEST:
            return { loading: true };
        case POST_DOC_IDS_SUCCESS:
            return { loading: false, success: true, postDoctorsId: action.payload };
        case POST_DOC_IDS_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};

export const patientAddReducer = (state = {}, action) => {
    switch (action.type) {
        case PATIENT_ADD_REQUEST:
            return { loading: true };
        case PATIENT_ADD_SUCCESS:
            return { loading: false, success: true, patientAdd: action.payload };
        case PATIENT_ADD_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};

export const patientEditReducer = (state = {}, action) => {
    switch (action.type) {
        case PATIENT_EDIT_REQUEST:
            return { loading: true };
        case PATIENT_EDIT_SUCCESS:
            return { loading: false, success: true, patientEdit: action.payload };
        case PATIENT_EDIT_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};

export const patientDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PATIENT_DELETE_REQUEST:
            return { loading: true };
        case PATIENT_DELETE_SUCCESS:
            return { loading: false, success: true, patientDelete: action.payload };
        case PATIENT_DELETE_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};
