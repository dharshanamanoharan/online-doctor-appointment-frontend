const AuthReducer=(state=0,action)=>{
    switch(action.type)
    {
        case "LOGIN":
            //alert("reducer login"+action.payload);
            state=action.payload;
            return state;
            
        case "LOGOUT":
            //alert("reducer logout")
            state=action.payload;
            return state;

        default: 
             return state;
    }
}
export default AuthReducer;