export const CurrentAppointment=(appointmentData,appointmentid)=>{
    return({
        type:"currentAppointment",
        payload1:appointmentid,
        payload2:appointmentData
    })
}