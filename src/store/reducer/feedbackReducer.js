import { FEEDBACK_LIST_REQUEST, FEEDBACK_LIST_SUCCESS, FEEDBACK_LIST_FAIL } from '../constants/feedback';

export const feedbackListReducer = (state = {}, action) => {
    switch (action.type) {
        case FEEDBACK_LIST_REQUEST:
            return { loading: true };
        case FEEDBACK_LIST_SUCCESS:
            return { loading: false, success: true, feedbackList: action.payload };
        case FEEDBACK_LIST_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};
