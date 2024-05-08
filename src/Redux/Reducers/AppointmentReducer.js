const initialState=[{
   appointmentId:"",
   userId:"",
   userFirstName:"",
   userLastName:"",
   userEmail:"",
   doctorId:"",
   doctorFirstName:"",
   doctorLastName:"",
   doctorEmail:"",
   doctorContactNumber:"",
   doctorAddress:"",
   patientFirstName:"",
   patientLastName:"",
   patientEmail:"",
   patientContactNumber:"",
   patientVisitReason:"",
   patientGender:"",
   patientAge:"",
   slotDate:"",
   slotTime:"",
   status:"",
   paymentID:"",
   amountPaid:"",
   orderID:"",
}]
const AppointmentReducer=(state=initialState,action)=>{
    switch(action.type){ 
        case 'currentAppointment':
            return state=action.payload2.filter((e)=>{return e.appointmentId===action.payload1});
        default: return state=initialState;
    }
}
export default AppointmentReducer;