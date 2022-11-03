import { combineReducers } from 'redux';
import { userLoginReducer } from './auth';
import {
    patientListReducer,
    patientAddReducer,
    patientEditReducer,
    patientDeleteReducer,
    PatientReportListOnSpecificDateReducer,
    patientReportReducer,
    allDoctorsAgainstPateintsReducer,
    postDoctorsIdReducer
} from './patient';
import { doctorListReducer, doctorAddReducer, doctorEditReducer, doctorDeleteReducer } from './doctorReducer';
import { nursesListReducer, nursesAddReducer, nursesEditReducer, nursesDeleteReducer } from './nursesReducer';
import { feedbackListReducer } from './feedbackReducer';

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
    patientReportListDate: PatientReportListOnSpecificDateReducer,
    patientReport: patientReportReducer,
    doctorList: doctorListReducer,
    doctorAdd: doctorAddReducer,
    doctorEdit: doctorEditReducer,
    doctorDelete: doctorDeleteReducer,
    nursesList: nursesListReducer,
    nursesAdd: nursesAddReducer,
    nursesEdit: nursesEditReducer,
    nursesDelete: nursesDeleteReducer,
    feedbackList: feedbackListReducer
});

export default reducer;
