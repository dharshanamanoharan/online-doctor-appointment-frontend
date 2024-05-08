export const CurrentUser=(userData,userid)=>{
    return({
        type:"currentUser",
        payload1:userid,
        payload2:userData
    })
}