import React from "react";
const RegistrationMessage=()=>{
    const success="Registered Successfully! A verification link has been sent to you email!";
    return(
        <section style={{minHeight:"70vh"}}>
        <div className="container-fluid registration-message-container py-5">
            <div className="container my-5 py-5 px-2">
                <div className="row">
                    <p >{success}</p>
                </div>
            </div>
        </div>
        </section>
    );
};
export default RegistrationMessage;