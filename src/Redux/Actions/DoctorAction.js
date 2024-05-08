export const CurrentDoctor=(doctorData,doctorid)=>{
    return({
        type:"currentDoctor",
        payload1:doctorid,
        payload2:doctorData
    })
}