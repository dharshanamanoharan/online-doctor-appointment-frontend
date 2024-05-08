
//Implementing basic authentication
//To store token in local storage
export const StoreToken=(token)=>localStorage.setItem("token",token);
export const StoreUserId=(id)=>localStorage.setItem("UserId",id);

//To get token from local storage
export const GetToken=()=>localStorage.getItem("token");
export const GetUserId=()=>localStorage.getItem("UserId");

//To Display links as per the authentication
export const SaveLoggedInUser=(username)=>localStorage.setItem("authenticatedUser",username);

//Checking if user is logged in or not
export const isUserLoggedIn=()=>{
    const username=localStorage.getItem("authenticatedUser");
    if(username==null)
    {
        return false;
    }
    else
    {
        return true;
    }
}

//Getting logged in user name
export const getLoggedInUser=()=>{
    const username=localStorage.getItem("authenticatedUser");
    return username;
}

//To Check if Admin or not
export const isAdmin=()=>{
    const role=localStorage.getItem("role");
    var flag;
    if(role!==null)
    {
        const rolearr=role.split(",");
        for(var i=0;i<rolearr.length;i++)
        {
            if(rolearr[i]==="ROLE_ADMIN")
            {
                //alert("ADMIN: true");
                flag=true;
                break;
            }
        }
    }
    if(flag===true)
    {
        return true;
    }
    else
    {
        return false;
    }
   
}

//Clearing everything from session and local storage on logout
export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}