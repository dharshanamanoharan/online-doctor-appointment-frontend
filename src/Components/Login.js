import React, { useState } from "react";
import {Link, useNavigate,Navigate} from "react-router-dom";
import {funShowPassword } from "../AuthService/ShowPassword";
import {SaveLoggedInUser, StoreToken, StoreUserId, isAdmin, isUserLoggedIn} from "../AuthService/AuthenticationService";
import axios from "axios";
const Login=()=>{
  
//Login Section
const [userNameOrEmail,setUserNameOrEmail]=useState("");
const [password,setPassword]=useState("");
const [emailErr,setEmailErr]=useState("");
const [passwordErr,setPasswordErr]=useState("");
const [loginErr,setLoginErr]=useState("");
const navigator=useNavigate();
const [userId,setUserId]=useState("");


//For handling login
const handleLogin=async(e)=>{
  e.preventDefault();
  (userNameOrEmail.trim()==="")?setEmailErr("Please enter valid username or email address"):setEmailErr("");
  (password.trim()==="")?setPasswordErr("Please enter the password to proceed"):setPasswordErr("");
  if(userNameOrEmail.trim!=="" && password.trim()!=="")
  {
    setEmailErr("");
    setPasswordErr("");
    setLoginErr("");
    try
    {
    const res=await axios.post("http://localhost:8080/docplus.in/auth/login",{userNameOrEmail,password});
    //const token='Basic' + window.btoa(userNameOrEmail +":" + password);Basic Authentication
    const token='Bearer '+res.data.accessToken;
    //console.log("Token",token);
    StoreToken(token);
    StoreUserId(res.data.userId);
    SaveLoggedInUser(userNameOrEmail);
    //alert(JSON.stringify(res.data));
    localStorage.setItem("role",res.data.role);
    (isAdmin())?navigator("/docplus.in/admin-panel"):navigator("/");
    window.location.reload(true);
    console.log(userId);
  }
  catch(error)
  {
    console.log(error);
    (error.message==="Request failed with status code 403")?setLoginErr("Please verify your user account and get it activated before you login!"):
    (error.message==="Request failed with status code 401")?setLoginErr("Please enter the valid username/email and password to login!"):
    (error.message=== 'Network Error')?setLoginErr("Network Error!"):setLoginErr("")
    setUserNameOrEmail("");
    setPassword("");
    document.getElementById("floatingInput").value="";
    document.getElementById("floatingPassword").value="";
  }
  }
}

//Reset Password Section
const [resetEmail,setResetEmail]=useState("");
const [resetError,setResetError]= useState("");
const [resetSuccess,setResetSuccess]= useState("");
const [resetEmailError,setResetEmailError]= useState("");


//For sending password reset email
const resetPasswordLinkEmail=async()=>{

  if(resetEmail.trim()==="")
  {
    setResetEmailError("Email address cannot be empty!");
  }
  if(!resetEmail.match(/^[a-zA-Z0-9.]+@[a-zA-Z]+.[A-Za-z]{2,}$/))
  {
    setResetEmailError("Please enter the valid email address");
  }
  if(resetEmail.trim()!=="" && (resetEmail.match(/^[a-zA-Z0-9.]+@[a-zA-Z]+.[A-Za-z]{2,}$/)))
  {
    setResetEmailError("");
    try
  {
    const res=await axios.post("http://localhost:8080/docplus.in/auth/resetPassword",{"userNameOrEmail":resetEmail});
    setResetSuccess("The password reset link has been sent to your Email ID!");
    setResetError("");
    document.getElementById("resetEmail").value="";
    setResetEmail("");
  }
  catch(error)
  {
    console.log(error);
    (error.message==="Network Error")?setResetError("Network Error!"):setResetError("No user account exists with the Email ID entered!");
    document.getElementById("resetEmail").value="";
    setResetSuccess("");
  }
  }
}

//Resend Verification Link
const [resendEmail,setResendEmail]=useState("");
const [resendError,setResendError]= useState("");
const [resendSuccess,setResendSuccess]= useState("");
const [resendEmailError,setResendEmailError]= useState("");
//Validating Verification Email field
const resendLinkEmail=async()=>{
  if(resendEmail.trim()==="")
  {
    setResendEmailError("Email address cannot be empty!");
  }
  if(!resendEmail.match(/^[a-zA-Z0-9.]+@[a-zA-Z]+.[A-Za-z]{2,}$/))
  {
    setResendEmailError("Please enter the valid email address");
  }
  if(resendEmail.trim()!=="" && (resendEmail.match(/^[a-zA-Z0-9.]+@[a-zA-Z]+.[A-Za-z]{2,}$/)))
  {
    setResendEmailError("");
    try{
      //console.log(resendEmail);
      const res=await axios.get("http://localhost:8080/docplus.in/auth/resendVerificationToken?email="+resendEmail);
      setResendSuccess("The verification link has been sent to your Email ID!");
      setResendEmail("");
      document.getElementById("resendEmail").value="";
      setResendError("");
      setResendEmailError("");
    }
    catch(error)
    {
      setResendSuccess("");
      setResendEmail("");
      console.log(error);
      document.getElementById("resendEmail").value="";
      if(error.message==="Request failed with status code 409")
      {
        setResendError("User already verified!");
      }
      if(error.message==="Request failed with status code 401")
      {
        setResendError("No user account exists with the Email ID entered!");
      }
      if(error.message==="Network Error")
      {
        setResendError("Network Error");
      }
    }
  }
}

  return(
      <>
      <section className="login-section container-fluid p-5">
          <div className="container p-5 m-5 login-container">
             <div className="row mb-0">
                  <div className="form-floating p-1 mb-0 col-12">
                    <input type="email" className="form-control " id="floatingInput" onChange={(e)=>{setUserNameOrEmail(e.target.value)}} placeholder=""/>
                    <label for="floatingInput">Email / Username</label>
                  </div>
              </div>
              <p className="col-12 login-err">{emailErr}</p>
              <div className="row">
                <div className="form-floating p-1 col-12 d-flex flex-row">
                  <input type="password" className="form-control" id="floatingPassword" onChange={(e)=>{setPassword(e.target.value)}} placeholder=""/>
                  <label for="floatingPassword">Password</label>
                  <div className="visible-icon" onClick={funShowPassword} >
                    <i id="show-pwd" className="fa-solid fa-eye-slash"></i>
                  </div>
                </div>             
              </div>
              <p className="col-12 login-err">{passwordErr}</p>
              <p className="col-12 login-err">{loginErr}</p>
              <div className=" mx-2 docplus-login" onClick={(e)=>{handleLogin(e);}}><a href=""><i className="fa-solid fa-key"></i>Login</a></div>
          
           <div className="forgot-password mb-0">
              Forgot Password?  
              {/*<!-- Button trigger modal -->*/}
              <a data-bs-toggle="modal" data-bs-target="#passwordResetModal">
              Reset Password
              </a>
           </div>
          <div className="register-now mb-0">
              Do not have an account yet?
              <Link to="/docplus.in/register">Register now!</Link>
          </div>
          <div className="verify-registration mb-0">
              Account hasn't been verified yet?
              {/*<!-- Button trigger modal -->*/}
              <a data-bs-toggle="modal" data-bs-target="#resendVerificationModal">
                Get Verified now!
              </a>
          </div>


        {/* Modal to reset password
        {/* <!-- Button trigger modal -->*/}
        <div className="modal" data-bs-backdrop='static' id="passwordResetModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header row m-0">
                <h5 className="modal-title col-9" id="exampleModalLabel">Reset Password</h5>
                <a className="col-1" onClick={()=>{setResetError("");setResetSuccess("");setResetEmailError("");}}  data-bs-dismiss="modal"><i className="fa-solid fa-x"></i></a>
              </div>
              <div className="modal-body">
                <section className="p-5 reset-password-section container-fluid">
                  <div className="container reset-container">
                      <div className="row">
                        <div className="mb-3 col-12">
                          <p className="row">Please enter the Email Id associated to your account.The link to reset your password will be sent to your email Id.</p>
                          <input className="row" type="email" id="resetEmail" onChange={(e)=> setResetEmail(e.target.value)}/>
                        </div>
                        <p className="row reset-pwd-error-msg"> {resetEmailError} </p>
                        <a className="col-3 mb-3" onClick={resetPasswordLinkEmail}>Enter</a>  
                        <p className="reset-pwd-error-msg"> {resetError} </p>
                        <p className="reset-pwd-success-msg">{resetSuccess}</p>
                      </div> 
                  </div>
                </section>
                </div>
              </div>
            </div>
          </div>  

          {/* Modal to resend verification link
        {/* <!-- Button trigger modal -->*/}
        <div className="modal" data-bs-backdrop='static' id="resendVerificationModal" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header row m-0">
                <h5 className="modal-title col-9" id="exampleModalLabel1">Verification Mail</h5>
                <a className="col-1" onClick={()=>{setResendError("");setResendSuccess("");setResendEmailError("");}}  data-bs-dismiss="modal"><i className="fa-solid fa-x"></i></a>
              </div>
              <div className="modal-body">
                <section className="p-5 resend-section container-fluid">
                  <div className="container resend-container">
                      <div className="row">
                        <div className="mb-3 col-12">
                          <p className="row">Please enter the Email Id associated to your account.The verification link will be sent to your email Id.</p>
                          <input className="row" type="email" id="resendEmail" onChange={(e)=> setResendEmail(e.target.value)}/>
                        </div>
                        <p className="row resend-error-msg"> {resendEmailError} </p>
                        <a className="col-3 mb-3" onClick={resendLinkEmail}>Enter</a>  
                        <p className="resend-error-msg"> {resendError} </p>
                        <p className="resend-success-msg">{resendSuccess}</p>
                      </div> 
                  </div>
                </section>
                </div>
              </div>
            </div>
          </div>  


        </div>    
       </section> 
       
      </>
  );
};
export default Login;