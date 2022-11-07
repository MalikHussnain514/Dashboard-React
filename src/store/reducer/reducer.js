import { combineReducers } from 'redux';
import { userLoginReducer } from './auth';
import { botListReducer, botAddReducer, botEditReducer, botDeleteReducer } from './botReducer';
import { emailListReducer, emailDeleteReducer } from './emailReducer';

// reducer import
import customizationReducer from './customizationReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    userLogin: userLoginReducer,

    botList: botListReducer,
    botAdd: botAddReducer,
    botEdit: botEditReducer,
    botDelete: botDeleteReducer,

    emailList: emailListReducer,
    emailDelete: emailDeleteReducer
});

export default reducer;
