import { combineReducers } from 'redux';
import { userLoginReducer } from './auth';
import {
    patientListReducer,
    patientAddReducer,
    patientEditReducer,
    patientDeleteReducer,
    allDoctorsAgainstPateintsReducer,
    postDoctorsIdReducer
} from './patient';
import { doctorListReducer, doctorAddReducer, doctorEditReducer, doctorDeleteReducer } from './doctorReducer';

// reducer import
import customizationReducer from './customizationReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    userLogin: userLoginReducer,
    patientList: patientListReducer,
    allDoctorsId: allDoctorsAgainstPateintsReducer,
    postDoctorsId: postDoctorsIdReducer,
    patientAdd: patientAddReducer,
    patientEdit: patientEditReducer,
    patientDelete: patientDeleteReducer,

    doctorList: doctorListReducer,
    doctorAdd: doctorAddReducer,
    doctorEdit: doctorEditReducer,
    doctorDelete: doctorDeleteReducer
});

export default reducer;
