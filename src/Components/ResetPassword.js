import React, { useState } from "react";
import { funShowPassword } from "../AuthService/ShowPassword";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
const ResetPassword=()=>{
  const tokenParam=useParams();
  console.log("reset token",tokenParam.token);
  //For saving the new password
  const [error,setError]=useState("")
  const [success,setSuccess]=useState("");
  const [inputPwd,setInputPwd]=useState("");
  const [pwdErr,setPwdErr]=useState("");
  const [token,setToken]=useState(tokenParam.token);
  const [disable,setDisable]=useState(false);
  const navigator=useNavigate();
  const funSaveResetPassword=async()=>{
    if(inputPwd.trim()==="")
    {
      setPwdErr("Password field cannot be empty");
    }
    else if(inputPwd.search(/[a-z]/) < 0) {
      setPwdErr("Password must contain atleast one lowercase letter");
    }
    else if (inputPwd.search(/[A-Z]/) < 0) {
      setPwdErr("Password must contain atleast one uppercase letter");
    }
    else if (inputPwd.search(/[0-9]/) < 0) {
      setPwdErr("Password must contain atleast one number"); 
    }
    else if(inputPwd.search(/[^\w]/)<0)
    {
      setPwdErr("Password must contain atleast one symbol");
    }
    else if (inputPwd.length < 8) {
      setPwdErr("Password must be atleast 8 characters long"); 
    }
    else{
      setPwdErr("");
     try{
          const newPassword=inputPwd;
          const response=await axios.post("http://localhost:8080/docplus.in/auth/savePassword?token="+token,{"newPassword":newPassword})
          setSuccess("The password has been reset Successfully!");
          setError("");
          setPwdErr("");
          document.getElementById('floatingPassword').value="";
          setToken("");
          setDisable(true);
      }
      catch(err)
      {
        setSuccess("");
        setError("The password reset link has been expired!");
        console.log(err);
        document.getElementById('floatingPassword').value="";
      }
     
    }
}
      return(
          <>
            <section className="save-reset-section container-fluid my-5" style={{minHeight:"70vh"}}>
              <div className="container py-5 save-reset-container">
                <div className="row" style={{display:(disable)?"none":"flex"}}>
                  <div className="form-floating p-1 col-12 d-flex flex-row">
                    <input type="password" disabled={disable} className="form-control" id="floatingPassword" onChange={(e)=>setInputPwd(e.target.value)} />
                    <label for="floatingPassword">New Password</label>
                    <div className="visible-icon" onClick={funShowPassword} >
                      <i id="show-pwd" className="fa-solid fa-eye-slash"></i>
                    </div>
                  </div>
                </div>
                <p className="mt-1 row reset-pwd-error-msg" style={{"font-size":"11px","height":"50px"}}>{pwdErr}</p>
                <p className="reset-pwd-error-msg m-0"> {error} </p>
                <h1 className=" m-0" style={{color: "green",height:(disable)?"100px":"0px",fontSize: "30px"}}>{success}</h1>
                <button className=" mx-2 mb-5 docplus-reset-save " style={{display:(disable)?"none":"block"}} disabled={disable} onClick={funSaveResetPassword}>Save</button>
              </div> 
          </section>
          </>
      );
  }
export default ResetPassword;