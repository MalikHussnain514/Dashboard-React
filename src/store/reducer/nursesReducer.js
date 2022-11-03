import {
    NURSES_LIST_REQUEST,
    NURSES_LIST_SUCCESS,
    NURSES_LIST_FAIL,
    NURSES_LIST_RESET,
    NURSE_ADD_REQUEST,
    NURSE_ADD_SUCCESS,
    NURSE_ADD_FAIL,
    NURSES_ADD_RESET,
    NURSES_EDIT_REQUEST,
    NURSES_EDIT_SUCCESS,
    NURSES_EDIT_FAIL,
    NURSES_EDIT_RESET,
    NURSES_DELETE_REQUEST,
    NURSES_DELETE_SUCCESS,
    NURSES_DELETE_FAIL,
    NURSES_DELETE_RESET
} from '../constants/nurses';

export const nursesListReducer = (state = {}, action) => {
    switch (action.type) {
        case NURSES_LIST_REQUEST:
            return { loading: true };
        case NURSES_LIST_SUCCESS:
            return { loading: false, success: true, nursesList: action.payload };
        case NURSES_LIST_FAIL:
            return { loading: false, success: false, error: action.payload };
        case NURSES_LIST_RESET:
            return { loading: false, success: false, error: false, nursesList: null };
        default:
            return state;
    }
};

export const nursesAddReducer = (state = {}, action) => {
    switch (action.type) {
        case NURSE_ADD_REQUEST:
            return { loading: true };
        case NURSE_ADD_SUCCESS:
            return { loading: false, success: true, nursesAdd: action.payload };
        case NURSE_ADD_FAIL:
            return { loading: false, success: false, error: action.payload };
        case NURSES_ADD_RESET:
            return { loading: false, success: false, error: false, nursesList: null };
        default:
            return state;
    }
};

export const nursesEditReducer = (state = {}, action) => {
    switch (action.type) {
        case NURSES_EDIT_REQUEST:
            return { loading: true };
        case NURSES_EDIT_SUCCESS:
            return { loading: false, success: true, nursesEdit: action.payload };
        case NURSES_EDIT_FAIL:
            return { loading: false, success: false, error: action.payload };
        case NURSES_EDIT_RESET:
            return { loading: false, success: false, error: false, nursesList: null };
        default:
            return state;
    }
};

export const nursesDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case NURSES_DELETE_REQUEST:
            return { loading: true };
        case NURSES_DELETE_SUCCESS:
            return { loading: false, success: true, nursesDelete: action.payload };
        case NURSES_DELETE_FAIL:
            return { loading: false, success: false, error: action.payload };
        case NURSES_DELETE_RESET:
            return { loading: false, success: false, error: false, nursesList: null };
        default:
            return state;
    }
};
