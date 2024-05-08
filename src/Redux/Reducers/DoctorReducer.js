const initialState=[{
    id:"",
    firstName:"",
    lastName:"",
    email:"",
    gender:"",
    specialization:"",
    description:"",
    address:"",
    location:"",
    phoneNumber:"",
    availability:"",
    image:"",
    fees:""
}]
const DoctorReducer=(state=initialState,action)=>{
    switch(action.type){ 
        case 'currentDoctor':
            return state=action.payload2.filter((e)=>{return e.id===action.payload1});
        default: return state=initialState;
    }
}
export default DoctorReducer;