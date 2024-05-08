import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const VerificationMessage=()=>{
    const token=useParams();
    console.log("Verification token:",token.token)
    const [message,setMessage]=useState("");
    const verifyUser=async()=>{
    try{
        const res= await axios.get("http://localhost:8080/docplus.in/auth/verifyRegistration?token="+token.token);
        setMessage("Verified Successfully! Your account has been activated. You can sign in now to utilize services offered by DocPlus!");
    }
    catch(error)
    {
        console.log(error);
        if(error.message==="Request failed with status code 400")
        {
            setMessage("Verification Failed! Your account has not been activated.");
        }
    }
    }
    useEffect(()=>{verifyUser();},[]);
    
    
    return(
        <section style={{minHeight:"70vh"}}>
        <div className="container-fluid registration-message-container py-5">
            <div className="container my-5 py-5 px-2">
                <div className="row">
                    <p>{message}</p>
                </div>
            </div>
        </div>
        </section>
    );
};
export default VerificationMessage;