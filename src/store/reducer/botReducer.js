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

export const botListReducer = (state = {}, action) => {
    switch (action.type) {
        case BOT_LIST_REQUEST:
            return { loading: true };
        case BOT_LIST_SUCCESS:
            return { loading: false, success: true, botList: action.payload };
        case BOT_LIST_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};

export const botAddReducer = (state = {}, action) => {
    switch (action.type) {
        case BOT_ADD_REQUEST:
            return { loading: true };
        case BOT_ADD_SUCCESS:
            return { loading: false, success: true, botAdd: action.payload };
        case BOT_ADD_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};

export const botEditReducer = (state = {}, action) => {
    switch (action.type) {
        case BOT_EDIT_REQUEST:
            return { loading: true };
        case BOT_EDIT_SUCCESS:
            return { loading: false, success: true, botEdit: action.payload };
        case BOT_EDIT_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};

export const botDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case BOT_DELETE_REQUEST:
            return { loading: true };
        case BOT_DELETE_SUCCESS:
            return { loading: false, success: true, botDelete: action.payload };
        case BOT_DELETE_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};
