import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField} from '@material-ui/core';
import * as Yup from 'yup';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { isAdmin } from '../AuthService/AuthenticationService';
const Register=()=>{
     const navigator=useNavigate();
     const admin=isAdmin();
     const location=useLocation();
    //RegeEx for validation
    const emailRegEx= /^[a-zA-Z0-9.]+@[a-zA-Z]+.[A-Za-z]{2,}$/;
    
    //Validation Schema using Yup
    const registerValues={
        firstName:"",
        lastName:"",
        email:"",
        userName:"",
        password:""
    };
    const regValidationSchema=Yup.object().shape({
        firstName:Yup.string().trim("Name cannot have leading or trailing spaces")
                              .strict(true)
                              .min(3,"Name must be atleast 3 characters long")
                              .max(15,"Name can be atmost 15 characters long")
                              .matches(/^[a-zA-Z]*$/,"No special characters or space is allowed.Use only alphabets")
                              .required("This field is required"),
        lastName:Yup.string().trim("Name cannot have leading or trailing spaces")
                             .strict(true)
                             .min(1,"Name must be atleast 3 characters long")
                             .max(15,"Name can be atmost 15 characters long")
                             .matches(/^[a-zA-Z]*$/,"No special characters or space is allowed.Use only alphabets")
                             .required("This field is required"),
        email:Yup.string().trim("email cannot have leading or trailing spaces")
                          .strict(true)
                          .matches(emailRegEx,"Enter a valid email address")
                          .required("This field is required"),
        userName:Yup.string().trim("Name cannot have leading or trailing spaces")
                            .strict(true)
                            .min(3,"Name must be atleast 3 characters long")
                            .max(15,"Name can be atmost 15 characters long")
                            .matches(/^[a-zA-Z0-9]*$/,"No special characters or space is allowed.Use only alphabets and numbers")
                            .required('This field is required'),
        password:Yup.string().trim("Password cannot have leading or trailing spaces")
                             .strict(true)
                             .min(8, 'Minimum character should be 8')
                             .matches(/[A-Z]/,"Password must contain atleast one capital letter")
                             .matches(/[a-z]/,"Password must contain atleast one small letter")
                             .matches(/[0-9]/,"Password must contain atleast one number")
                             .matches(/[^\w]/,"Password must contain atleast one symbols")
                             .min(8, 'Password must be 8 characters long')
                             .required('This field is required')
    })
    
    //Handling Register
    const [regErr,setRegErr]=useState("")
    const handleRegister=async(values,props)=>{
      //"values" cannot be passed directly
      const firstName=values.firstName;
      const lastName=values.lastName;
      const userName=values.userName;
      const email=values.email;
      const password=values.password;
      setRegErr("");
      try{
        const res= await axios.post("http://localhost:8080/docplus.in/auth/register",{firstName,lastName,userName,email,password});
        //console.log(res.data);
        if(res.data==="Registered Successfully")
        {
          if(!admin)
          {
            navigator("/docplus.in/registration-message");
          }
          props.resetForm();
        }
      }
      catch(error){
        console.log(error);
        //console.log("response",error.response)
        if(error.code==="ERR_BAD_REQUEST")
        setRegErr("Registration failed.Try registering with a different Username or Email Id");
      };
    }

    return(
        <>
          <section className="register-section container-fluid p-5" style={{backgroundImage:((location.pathname)==="/docplus.in/admin-panel")?"none":"url('/public/register-bg.svg')"}}>
          <div className="container px-5 register-container" >
           <Formik initialValues={registerValues} validationSchema={regValidationSchema} onSubmit={handleRegister}>
                {(props)=>(
                    <Form className='register-form'>
          
                        <div className='row m-4'>
                        <Field   as={TextField} label="First Name" name='firstName'type="text" helperText={<ErrorMessage name='firstName' />} required error={props.errors.firstName && props.touched.firstName}  />
                        </div>
                        <div className='row m-4'>
                        <Field   as={TextField} label="Last Name" name='lastName' type="text" helperText={<ErrorMessage name='lastName' />} required error={props.errors.lastName && props.touched.lastName}  />
                        </div>
                        <div className='row m-4'>
                        <Field as={TextField} label="Email" name='email' type="email"  helperText={<ErrorMessage name='email' />} required error={props.errors.email && props.touched.email}  />
                        </div>
                        <div className='row m-4'>
                        <Field  as={TextField}  label="User Name" name='userName' type="text"  helperText={<ErrorMessage name='userName' />} required error={props.errors.userName && props.touched.userName}  />
                        </div>
                        <div className='row m-4'>
                        <Field  className="col-10" as={TextField}  label="Password" name='password'type="password"  helperText={<ErrorMessage name='password' />} required error={props.errors.password && props.touched.password} />
                        </div>
                        <div className='row mx-4'>
                          <p className='m-0 reg-err'>{regErr}</p>
                          <button type='submit' className="docplus-register col-12" style={{backgroundColor:((location.pathname)==="/docplus.in/admin-panel")?"black":"#494A80"}} >Register</button>
                          {(!admin)&&<div className="col-12 login-now">
                            <b>Do you have an account already?</b><br></br>
                            <a><Link to="/docplus.in/login">Login here!</Link></a>
                          </div>}
                        </div>
                    </Form>
                )}
            </Formik>
            </div>
            </section>
        </>
    );
};
export default Register;