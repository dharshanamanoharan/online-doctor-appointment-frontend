import { useState } from "react";
import { GetUserId, getLoggedInUser } from "../AuthService/AuthenticationService";
import axios from "axios";
import { useEffect } from "react";
import { funShowPassword, funShowPassword1 } from "../AuthService/ShowPassword";
const UserProfile=()=>{
   
    const [firstName,setFirstName]=useState();
    const [lastName,setLastName]=useState();
    const [userName,setUserName]=useState();
    const [email,setEmail]=useState();
    const [user_avatar,setUserAvatar]=useState();
    const [displayPicture,setDisplayPicture]=useState();
    const [password,setPassword]=useState("");
    const [role,setRole]=useState("");
    const[roles,setRoles]=useState([]);
    const profileId=GetUserId();
    //console.log("ID",profileId);
    const [profileData,setProfileData]=useState({
            firstName:"",
            lastName:"",
            email:"",
            userName:"",
            user_avatar:"",
            password:"",
            displayPicture:""
    })
   
    
   
    const profile=async()=>{
        try{
            const res=await axios.get("http://localhost:8080/docplus.in/user/"+profileId);
            setProfileData(res.data);
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setUserName(res.data.userName);
            setEmail(res.data.email);
            setUserAvatar(res.data.user_avatar);
            setDisplayPicture(res.data.displayPicture);
           // console.log("DP",res.data);
            
        }
        catch(error)
        {
            console.log(error);
        }
    }
    useEffect(()=>{
        profile();
    },[]);

    //Editing the profile

    //To display error on validation
    const [err1,setErr1]=useState("");
    const [err2,setErr2]=useState("");
    const [err3,setErr3]=useState("");
    const [err4,setErr4]=useState("");
    const [err6,setErr6]=useState("");
    const [updateMessage,setUpdateMessage]=useState("");

    //RegeEx for validation
    const emailRegEx=new RegExp(/^[a-zA-Z0-9.]+@[a-zA-Z]+.[A-Za-z]{2,}$/);
    const nameRegEx=new RegExp(/^[a-zA-Z]*$/);
    const userNameRegEx=new RegExp(/^[a-zA-Z0-9]*$/);
 
    var fl1,fl2,fl3,fl4,fl6,fl7;
    //Clearing Values on Closing
    function editClear()
    {
        setUpdateMessage("");setErr1("");setErr2("");setErr3("");
        setErr4("");setErr6("");
        document.getElementById("floatingInput1").value="";
        document.getElementById("floatingInput2").value="";
        document.getElementById("floatingInput3").value="";
        document.getElementById("floatingInput4").value="";
        document.getElementById("floatingInput6").value="";   
    }
    
   
    async function funEditProfile()
    {
        const formData = new FormData();
        formData.append('file',user_avatar);
        formData.append('firstName',firstName);
        formData.append('lastName',lastName);
        formData.append('userName',userName);
        formData.append('email',email);
        formData.append('password',password);
        formData.append('role',role);
        formData.append('roles',roles);
       setErr1("");setErr2("");setErr3("");setErr4("");
       setErr6("");setUpdateMessage("");
       //Ternary
           (firstName.trim()==="" || firstName.length<3 || !nameRegEx.test(firstName) )?setErr1("Name must be atleast 3 alphabets & atmost 15 alphabets"):fl1=true;
           (lastName.trim()==="" || lastName.length<3 || !nameRegEx.test(lastName))?setErr2("Name must be atleast 3 alphabets & atmost 15 alphabets"):fl2=true;
           (userName.trim()===""||userName.length<3|| !userNameRegEx.test(userName))?setErr3("Name must be atleast 3 & atmost 15 alphanumeric characters"):fl3=true;
           (email.trim()==="" || !emailRegEx.test(email))?setErr4("Please enter valid email address!"):fl4=true;
           (user_avatar===null )?setErr6("Please upload a picture"):fl6=true;
       
           if(fl1===true && fl2===true && fl3===true && fl4===true  && fl6===true )
           {
               try
               {   
                   const res=await axios.put("http://localhost:8080/docplus.in/user/"+profileId,
                   formData,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    }
                  });
                   setErr1("");setErr2("");setErr3("");setErr4("");
                   setErr6("");
                   setUpdateMessage("Updated Successfully!");
                   //console.log(res.data); 
               }
               catch(error)
               {
                   console.log(error)
                   setUpdateMessage("Update Failed!");
               }
           }
    }
    //Changing Password
    const [oldPassword,setOldPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [errOld,setErrOld]=useState("");
    const [errNew,setErrNew]=useState("");
    function editPwdClr()
    {
        setNewPassword("");
        setOldPassword("");
        document.getElementById("floatingPassword").value="";
        document.getElementById("floatingPassword1").value="";
    }
   
    async function funChangePwd()
    {
        var fl1,fl2;
        setErrOld("");setErrNew("");setUpdateMessage("");
        const pwRegEx1=new RegExp(/[a-z]/);
        const pwRegEx2=new RegExp(/[A-Z]/);
        const pwRegEx3=new RegExp(/[0-9]/);
        const pwRegEx4=new RegExp(/[^\w]/);
        (oldPassword.trim()==="")?setErrOld("This field cannot be empty"):fl1=true;
        (newPassword.trim()===""||newPassword.length<8||
        !pwRegEx1.test(newPassword)||!pwRegEx2.test(newPassword)||
        !pwRegEx3.test(newPassword)||!pwRegEx4.test(newPassword))?
        setErrNew("Password must be atleast 8 characters with 1 uppercase,1 lowercase,1 number and 1 symbol")
        :fl2=true;
        const userNameOrEmail=getLoggedInUser();
        console.log("uname",userNameOrEmail);
        if(fl1===true && fl2===true)
        {
            try{
                const res=await axios.post("http://localhost:8080/docplus.in/auth/changePassword",{
                    userNameOrEmail,    
                    oldPassword,
                    newPassword
                    
                })
                //console.log(res.data);
                setUpdateMessage("Updated Successfully!")
                editPwdClr();
            }
            catch(error)
            {
                console.log(error);
                setUpdateMessage("Updated Failed!");
                editPwdClr();
            }
        }

    }
    
    return(
        <>
        <section className="container-fluid edit-my-profile-section py-5">
            <img src={`data:image/jpeg;base64,${profileData.displayPicture}`} className="mb-4 img-fluid profile-picture"/>
            <div className="profile-detail">
                <p><span>User ID : </span>{profileId}</p>
                <p><span>First Name : </span>{profileData.firstName}</p>
                <p><span>Last Name : </span>{profileData.lastName}</p>
                <p><span>Email ID : </span>{profileData.email}</p>
                <p><span>User Name : </span>{profileData.userName}</p>
            </div>
            <a className='my-2 edit-profile' data-bs-toggle="modal" data-bs-target="#staticBackdropedit" >
                <i className="me-2 fa-regular fa-pen-to-square"></i>
                <span>Edit Profile</span>
            </a>
            <a className='my-2 change-pwd' data-bs-toggle="modal" data-bs-target="#staticBackdropchangepwd" >
                <i className="me-2 fa-solid fa-lock"></i>
                <span>Change Password</span>
            </a>

            {/*Modal-Edit My profile*/}
            <div className="modal fade" id="staticBackdropedit" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 mb-0" style={{color:"snow"}} id="staticBackdropLabel">Edit Profile</h1>
                            <a className="col-1"  data-bs-dismiss="modal" onClick={()=>{editClear();}}><i className="fa-solid fa-x"></i></a>
                        </div>
                        <div className="modal-body d-flex flex-column py-5">
                            <div className="row">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floatingInput1" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                                    <label for="floatingInput1">FirstName</label>
                                </div>
                            </div>
                            <p className="app-err row">{err1}</p>
                            <div className="row">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floatingInput2" value={lastName}  onChange={(e)=>setLastName(e.target.value)} />
                                    <label for="floatingInput2">LastName</label>
                                </div>
                            </div>
                            <p className="row app-err">{err2}</p>
                            <div className="row">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floatingInput3"  value={userName} onChange={(e)=>setUserName(e.target.value)}/>
                                    <label for="floatingInput3">UserName</label>
                                </div>
                            </div>
                            <p className="row app-err">{err3}</p>
                            <div className="row">
                                <div className="form-floating">
                                    <input type="email" className="form-control" id="floatingInput4" value={email} onChange={(e)=>setEmail(e.target.value)} />
                                    <label for="floatingInput4">Email</label>
                                </div>
                            </div>
                            <p className="row app-err">{err4}</p>
                            <div className='row'>
                                <div className="form-floating">
                                   {/*<input type="file"  className="form-control" id="floatingInput6" onChange={(e)=>{var a=(e.target.value);setUserAvatar(a.replace("C:\\fakepath\\", "../"));}} />*/}
                                   <input type="file"  className="form-control" id="floatingInput6" onChange={
                                    (e)=>{
                                        setUserAvatar(e.target.files[0]);
                                        }} />
                                    <label for="floatingInput6">User Avatar</label>
                                </div>
                            </div>
                            <p className="row app-err">{err6}</p>
                            <div className='row'>
                                <a className="edit-profile" onClick={()=>funEditProfile()}>Update</a>
                            </div>
                            <p className="mt-3 row app-err" style={{color:(updateMessage.includes("Updated Successfully!"))?"green":"red"}}>{updateMessage}</p>
                        </div>
                        </div>
                    </div>
                    </div>


                    {/*Modal-Change Password*/}
                    <div className="modal fade" id="staticBackdropchangepwd" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 mb-0" style={{color:"snow"}} id="staticBackdropLabel">Change Password</h1>
                            <a className="col-1"  data-bs-dismiss="modal" onClick={()=>{setUpdateMessage("");editPwdClr();}}><i className="fa-solid fa-x"></i></a>
                        </div>
                        <div className="modal-body d-flex flex-column py-5">
		                <div className="row">
                                <div className="form-floating p-1 col-12 d-flex flex-row">
                                    <input type="password" className="form-control" id="floatingPassword" onChange={(e)=>{setOldPassword(e.target.value);}}/>
                                    <label for="floatingPassword">Old Password</label>
                                    <div className="visible-icon" onClick={funShowPassword} >
                                        <i id="show-pwd" className="fa-solid fa-eye-slash"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="row app-err">{errOld}</p>
                            <div className="row">
                                <div className="form-floating p-1 col-12 d-flex flex-row">
                                    <input type="password" className="form-control" id="floatingPassword1" onChange={(e)=>{setNewPassword(e.target.value);}}/>
                                    <label for="floatingPassword1">New Password</label>
                                    <div className="visible-icon" onClick={funShowPassword1} >
                                        <i id="show-pwd1" className="fa-solid fa-eye-slash"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="row app-err">{errNew}</p>
                          
                            <div className='row'>
                                <a className="edit-profile" onClick={()=>funChangePwd()}>Change</a>
                            </div>
                            <p className="mt-3 row app-err" style={{color:(updateMessage.includes("Updated Successfully!"))?"green":"red"}}>{updateMessage}</p>
                        </div>
                        </div>
                    </div>
                    </div>
        </section>
        </>
    );
}
export default UserProfile;