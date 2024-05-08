import { combineReducers } from "redux";
import AuthReducer from "./Reducers/AuthReducer";
import BookReducer from "./Reducers/BookReducer";
import UserReducer from "./Reducers/UserReducer";
import DoctorReducer from "./Reducers/DoctorReducer";
import AppointmentReducer from "./Reducers/AppointmentReducer";
const RootReducer=combineReducers(
    {   
       auth: AuthReducer,
       booking:BookReducer,
       user:UserReducer,
       doctor:DoctorReducer,
       appointment:AppointmentReducer,
    }
);
export default  RootReducer;
