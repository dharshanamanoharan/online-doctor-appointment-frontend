const initialState=[{
    id:"",
    firstName:"",
    lastName:"",
    userName:"",
    email:"",
    role:"",
    enabled:false,
    user_avatar:"",
    roles:[]

}]
const UserReducer=(state=initialState,action)=>{
    switch(action.type){ 
        case 'currentUser':
            return state=action.payload2.filter((e)=>{return e.id===action.payload1});
        default: return state=initialState;
    }

}
export default UserReducer;