
export const AUTHLOGIN=(userId)=>{
    return( {
        type:"LOGIN",
        payload:userId      
    })  
};
export const AUTHLOGOUT=()=>{
    return(
    {
        type:"LOGOUT",
        payload:null
    })
};