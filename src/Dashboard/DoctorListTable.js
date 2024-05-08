import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import { CurrentDoctor } from '../Redux/Actions/DoctorAction';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const DoctorListTable=()=>{
    const dispatch=useDispatch();
    const doctor=useSelector((state)=>state.doctor)
    //console.log("Doctor from reducer",doctor);
    
    //Getting Doctor List
    const [doctorData,setDoctorData]=useState([]);

    const getAllDoctors=async()=>{
       try
       {
           const res=await axios.get("http://localhost:8080/docplus.in/doctors-list");
           setDoctorData(res.data);
           //console.log(res.data);
       }
       catch(error)
       {
           console.log(error);
       }
    }
    useEffect(()=>{getAllDoctors();},[funEditDoctor,funDeleteDoctor,funAddDoctor]);
    

    //Viewing the Doctor
    async function funViewDoctor(id)
    {
        try{   
            const res=await axios.get("http://localhost:8080/docplus.in/doctor/"+id);
            //console.log(res.data); 
        }
        catch(error)
        {
            console.log(error)
        }
    }

    //Creating rows of the table
    const rows=[];
    
    for(var i=0;i<doctorData.length;i++)
    {
        rows[i]=createData(
            doctorData[i].id,
            doctorData[i].firstName,
            doctorData[i].lastName,
            doctorData[i].email,
            doctorData[i].gender,
            doctorData[i].specialization,
           /* doctorData[i].description,*/
            doctorData[i].address,
            doctorData[i].location,
            doctorData[i].phoneNumber,
            doctorData[i].availability,
            /*doctorData[i].image,*/
            doctorData[i].fees
            )
    }
    //console.log("rows:",rows);
      
    //Creating columns of the table
    const columns = [
        {label: 'Doctor_ID',id:"doctorID"},
        {label: 'First_Name',id:"firstName"},
        {label: 'Last_Name',id:"lastName"},
        {label: 'Email_ID',id:"email"},
        {label: 'Gender',id:"gender"},
        {label: 'Specialization',id:"specialization"},
       /* {label: 'Description',id:"description"},*/
        {label: 'Address',id:"address"},
        {label: 'Location',id:"location"},
        {label: 'Phone_Number',id:"phoneNumber"},
        {label: 'Availability',id:"availability"},
       /* {label: 'Image',id:"image"},*/
        {label: 'Fees',id:"fees"}
    ];
    

    function createData(doctorID,firstName,lastName,email,gender,specialization,address,location,phoneNumber,availability,fees) {
        return {doctorID,firstName,lastName,email,gender,specialization,address,location,phoneNumber,availability,fees};
    }
     
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => 
    {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //Deleting the doctor
    const [delMsg,setDelMsg]=useState("");
    async function funDeleteDoctor(id)
    {
        try{   
            const res=await axios.delete("http://localhost:8080/docplus.in/doctor/"+id);
            //console.log(res.data); 
            setDelMsg("Deleted Successfully!");
        }
        catch(error)
        {
            console.log(error)
            if(error.message==="Request failed with status code 404")
            {
                setDelMsg("Doctor has been deleted already!");
            }
            else
            {
                setDelMsg("Delete Failed!");
            }
        }
    }

    //Adding the Doctor

    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const [gender,setGender]=useState("");
    const [specialization,setSpecialization]=useState("");
    const [description,setDescription]=useState("");
    const [address,setAddress]=useState("");
    const [location,setLocation]=useState("");
    const [phoneNumber,setPhoneNumber]=useState("");
    const [availability,setAvailability]=useState("");
    const [image,setImage]=useState("");
    const [fees,setFees]=useState("");

    //RegEx for Validation
    const emailRegEx=new RegExp(/^[a-zA-Z0-9.]+@[a-zA-Z]+.[A-Za-z]{2,}$/);
    const nameRegEx=new RegExp(/^[a-zA-Z]*$/);
    const phoneRegEx=new RegExp(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/);
    const messageRegEx=new RegExp(/[a-zA-Z0-9]/);
    var fl1,fl2,fl3,fl4,fl5,fl6,fl7,fl8,fl9,fl10,fl11,fl12;

    //To display error on validation
    const [err1,setErr1]=useState("");const [err7,setErr7]=useState("");
    const [err2,setErr2]=useState("");const [err8,setErr8]=useState("");
    const [err3,setErr3]=useState("");const [err9,setErr9]=useState("");
    const [err4,setErr4]=useState("");const [err10,setErr10]=useState("");
    const [err5,setErr5]=useState("");const [err11,setErr11]=useState("");
    const [err6,setErr6]=useState("");const [err12,setErr12]=useState("");
    const [addMessage,setAddMessage]=useState("");

     //Clearing Values on Closing
     function addClear()
     {
         setErr1("");setErr2("");setErr3("");
         setErr4("");setErr5("");setErr6("");
         setErr7("");setErr8("");setErr9("");
         setErr10("");setErr11("");setErr12("");
         setFirstName("");setLastName("");setEmail("");
         setGender("");setAddress("");setLocation("");
         setPhoneNumber("");setAvailability("");setDescription("");
         setSpecialization("");setImage("");setFees("");
         document.getElementById("floating1").value="";
         document.getElementById("floating2").value="";
         document.getElementById("floating3").value="";
         document.getElementById("floating4").value="";
         document.getElementById("floating5").value="";
         document.getElementById("floating6").value="";
         document.getElementById("floating7").value="";
         document.getElementById("floating8").value="";
         document.getElementById("floating9").value="";
         document.getElementById("floating10").value="";
         document.getElementById("floating11").value="";
     }

    //Add Doctor Function
    async function funAddDoctor(id)
    {
        setErr1("");setErr2("");setErr3("");setErr4("");
        setErr5("");setErr6("");setErr7("");setErr8("");
        setErr9("");setErr10("");setErr11("");setErr12("");
        setAddMessage("");
        
        (firstName.trim()==="" || firstName.length<3 || !nameRegEx.test(firstName) )?setErr1("Name must be atleast 3 alphabets & atmost 15 alphabets"):fl1=true;
        (lastName.trim()==="" || lastName.length<3 || !nameRegEx.test(lastName))?setErr2("Name must be atleast 3 alphabets & atmost 15 alphabets"):fl2=true;
        (email.trim()==="" || !emailRegEx.test(email))?setErr3("Please enter valid email address"):fl3=true;
        (gender.trim()==="")?setErr4("Please select the gender"):fl4=true;
        (specialization.trim()==="")?setErr5("Please enter the specialization field"):fl5=true;
        (description.trim()===""||description.length<10)?setErr6("Description must be atleast 10 characters"):fl6=true;
        (address.trim()===""||address.length<10)?setErr7("Address must be atleast 10 characters"):fl7=true;
        (location.trim()===""||location.length<4)?setErr8("Location must be atleast 5 characters "):fl8=true;
        (phoneNumber.trim()===""||!phoneRegEx.test(phoneNumber)|| phoneNumber.length<10)?setErr9("Please enter valid phone number"):fl9=true;
        (availability.trim()==="")?setErr10("Please select the availability"):fl10=true;
        (fees.trim()===""||fees<0)?setErr12("Please enter the fee"):fl12=true;
        (image.trim()==="" )?setErr11("Please upload a picture"):fl11=true;
        
        if(fl1===true && fl2===true && fl3===true && fl4===true && fl5===true && fl6===true && 
           fl7===true  && fl8===true && fl9===true && fl10===true && fl11===true && (fl12===true))
        {
            try{   
                const res=await axios.post("http://localhost:8080/docplus.in/add-doctor",{
                    firstName,
                    lastName,
                    email,
                    gender,
                    specialization,
                    description,
                    address,
                    location,
                    phoneNumber,
                    availability,
                    image,
                    fees
                });
                addClear();
                setAddMessage("Added Successfully!");
                //console.log(res.data); 
            }
            catch(error)
            {
                console.log(error);
                setAddMessage("Registration Failed");
            }
        }
    }
    
    useEffect(()=>
    {
       setFirstName(doctor[0].firstName);
       setLastName(doctor[0].lastName);
       setEmail(doctor[0].email);
       setGender(doctor[0].gender);
       setSpecialization(doctor[0].specialization);
       setDescription(doctor[0].description);
       setAddress(doctor[0].address);
       setLocation(doctor[0].location);
       setPhoneNumber(doctor[0].phoneNumber);
       setAvailability(doctor[0].availability);
       setImage(doctor[0].image);
       setFees(doctor[0].fees);
    },[doctor]);

     //Editing the Doctor
     const [updateMessage,setUpdateMessage]=useState("");
     function editClear()
    {
        setErr1("");setErr2("");setErr3("");
         setErr4("");setErr5("");setErr6("");
         setErr7("");setErr8("");setErr9("");
         setErr10("");setErr11("");setErr12("");
         setFirstName("");setLastName("");setEmail("");
         setGender("");setAddress("");setLocation("");
         setPhoneNumber("");setAvailability("");setDescription("");
         setSpecialization("");setImage("");setFees("");
         document.getElementById("float1").value="";
         document.getElementById("float2").value="";
         document.getElementById("float3").value="";
         document.getElementById("float4").value="";
         document.getElementById("float5").value="";
         document.getElementById("float6").value="";
         document.getElementById("float7").value="";
         document.getElementById("float8").value="";
         document.getElementById("float9").value="";
         document.getElementById("float10").value="";
         document.getElementById("float11").value="";
        
    }

   

    async function funEditDoctor(id)
    {
        setErr1("");setErr2("");setErr3("");setErr4("");
        setErr5("");setErr6("");setErr7("");setErr8("");
        setErr9("");setErr10("");setErr11("");setErr12("");
        setUpdateMessage("");
        var f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12;
        (firstName.trim()==="" || firstName.length<3 || !nameRegEx.test(firstName) )?setErr1("Name must be atleast 3 alphabets & atmost 15 alphabets"):f1=true;
        (lastName.trim()==="" || lastName.length<3 || !nameRegEx.test(lastName))?setErr2("Name must be atleast 3 alphabets & atmost 15 alphabets"):f2=true;
        (email.trim()==="" || !emailRegEx.test(email))?setErr3("Please enter valid email address"):f3=true;
        (gender.trim()==="")?setErr4("Please select the gender"):f4=true;
        (specialization.trim()==="")?setErr5("Please enter the specialization field"):f5=true;
        (description.trim()===""||description.length<10)?setErr6("Description must be atleast 10 characters"):f6=true;
        (address.trim()===""||address.length<10)?setErr7("Address must be atleast 10 characters"):f7=true;
        (location.trim()===""||location.length<4)?setErr8("Location must be atleast 5 characters "):f8=true;
        (phoneNumber.trim()===""||!phoneRegEx.test(phoneNumber)|| phoneNumber.length<10)?setErr9("Please enter valid phone number"):f9=true;
        (availability.trim()==="")?setErr10("Please select the availability"):f10=true;
        (fees===""||fees<=0)?setErr12("Please enter the fee"):f12=true;
        (image.trim()==="" )?setErr11("Please upload a picture"):f11=true;
       console.log(f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12);
        if(f1===true && f2===true && f3===true && f4===true && f5===true && f6===true && 
           f7===true  && f8===true && f9===true && f10===true && f11===true && (f12===true))
        {
            try{   
                const res=await axios.put("http://localhost:8080/docplus.in/doctor/"+id,{
                    firstName,
                    lastName,
                    email,
                    gender,
                    specialization,
                    description,
                    address,
                    location,
                    phoneNumber,
                    availability,
                    image,
                    fees
                });
                //console.log(res.data); 
                editClear();
                setUpdateMessage("Updated Successfully!");
            }
            catch(error)
            {
                console.log(error);
                setUpdateMessage("Updation Failed");
            }
        }
    }


   return(
    <section className='container-fluid p-5' style={{backgroundColor:"#1a1a1a",color:"snow",height:"100vh"}}>
    <h5 style={{textAlign:"center"}} className='mb-4'> DOCTORS LIST</h5>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        
                <TableContainer sx={{ maxHeight: 440 }}>
                   <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns && columns.map((column) => (
                            <TableCell key={column.id} style={{backgroundColor:"black",color:"snow"}}>
                            {column.label}
                            </TableCell>
                        ))}
                        <TableCell style={{backgroundColor:"black",color:"snow"}}>View</TableCell>
                        <TableCell style={{backgroundColor:"black",color:"snow"}}>Edit</TableCell>
                        <TableCell style={{backgroundColor:"black",color:"snow"}}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row,i) => {var doctorId;
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns && columns.map((column) => {
                                const value = row[column.id];
                                doctorId=row["doctorID"];
                                return (<>
                                    <TableCell key={column.id} style={{backgroundColor:((i)%2===0)?"rgb(41, 39, 39)":"rgb(41, 39, 39)",color:"snow"}}>
                                    {column.format && (typeof value === 'number')
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                    </>
                                  );}
                                )} 
                                <TableCell style={{backgroundColor:((i)%2===0)?"rgb(41, 39, 39)":"rgb(41, 39, 39)",color:"snow"}}>
                                    <button className="view-doctor" onClick={()=>{(dispatch(CurrentDoctor(doctorData,doctorId)));funViewDoctor(doctorId)}}  data-bs-toggle="modal" data-bs-target="#staticBackdrop5">
                                        <i className="fa-solid fa-eye"></i>
                                    </button>
                                </TableCell>
                                <TableCell style={{backgroundColor:((i)%2===0)?"rgb(41, 39, 39)":"rgb(41, 39, 39)",color:"snow"}}>
                                    <button className="edit-doctor" onClick={()=>{(dispatch(CurrentDoctor(doctorData,doctorId)));}} data-bs-toggle="modal" data-bs-target="#staticBackdrop6">
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </button>
                                </TableCell>
                                <TableCell style={{background:((i)%2===0)?"rgb(41, 39, 39)":"rgb(41, 39, 39)",color:"snow"}}>
                                    <button className="delete-doctor" onClick={()=>{(dispatch(CurrentDoctor(doctorData,doctorId)));}} data-bs-toggle="modal" data-bs-target="#staticBackdrop7">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </TableCell>
                            </TableRow>
                       );})}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageoptions={[5, 10, 15]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{color:"snow",backgroundColor:"black"}}
                />
               </Paper>
               <div className="row add-doctor">
                    <a style={{color:"snow",fontSize:"13px",padding:"5px"}} data-bs-toggle="modal" data-bs-target="#staticBackdrop8">Add Doctor</a>
               </div>

               {/*Modal Section*/}
               <section className="admin-panel-doctors">

                {/*Modal 1-View Doctor*/}
                <div className="modal fade " id="staticBackdrop5" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog ">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Doctor</h1>
                                <a className="col-1"  data-bs-dismiss="modal"><i className="fa-solid fa-x"></i></a>
                            </div>
                        <div className="modal-body view-profile">
                            <div className=" card pb-2" >
                                <img src={doctor[0].image} className="card-img-top img-fluid" alt="..."/>
                                <div className="card-body">
                                        <p><span>Doctor ID : </span>{doctor[0].id}</p>
                                        <p><span>First Name : </span>{doctor[0].firstName}</p>
                                        <p><span>Last Name : </span>{doctor[0].lastName}</p>
                                        <p><span>Email ID : </span>{doctor[0].email}</p>
                                        <p><span>Gender : </span>{doctor[0].gender}</p>
                                        <p><span>Specialization : </span>{doctor[0].specialization}</p>
                                        <p><span>Description : </span>{doctor[0].description}</p>
                                        <p><span>Address : </span>{doctor[0].address}</p>
                                        <p><span>Location : </span>{doctor[0].location}</p>
                                        <p><span>Phone Number : </span>{doctor[0].phoneNumber}</p>
                                        <p><span>Availability : </span>{doctor[0].availability}</p>
                                        <p><span>Fees : </span>Rs. {doctor[0].fees}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

              {/*Modal2-Edit Doctor*/}
              <div className="modal fade edit-doctor-section" id="staticBackdrop6" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Doctor Details</h1>
                            <a className="col-1"  data-bs-dismiss="modal" onClick={()=>{editClear();}}><i className="fa-solid fa-x"></i></a>
                        </div>
                        <div className="modal-body d-flex flex-column py-5">
                            <div className="row">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="float1"  value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                                    <label for="float1">FirstName</label>
                                </div>
                            </div>
                            <p className="app-err row">{err1}</p>
                            <div className="row">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="float2" value={lastName}  onChange={(e)=>setLastName(e.target.value)} />
                                    <label for="float2">LastName</label>
                                </div>
                            </div>
                            <p className="row app-err">{err2}</p>
                           
                            <div className="row">
                                <div className="form-floating">
                                    <input type="email" className="form-control" id="float3" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                    <label for="float3">Email</label>
                                </div>
                            </div>
                            <p className="row app-err">{err3}</p>
                            <div className="row">
                                <div className="d-flex flex-row align-center">
                                    <input type="radio" className='ms-3' checked={(gender.toLowerCase()==="male")?true:false} name="gender" id="male-gender" value="male" onChange={(e)=>setGender(e.target.value)}/>
                                    <label style={{color:"snow"}} for="male-gender">Male</label>
                                    <input type="radio" className='ms-3' name="gender" checked={(gender.toLowerCase()==="female")?true:false} id="female-gender" value="female" onChange={(e)=>setGender(e.target.value)}/>
                                    <label style={{color:"snow"}} for="female-gender">Female</label>
                                    <input type="radio" className='ms-3' name="gender" checked={(gender.toLowerCase()==="other")?true:false} id="other-gender" value="other" onChange={(e)=>setGender(e.target.value)}/>
                                    <label style={{color:"snow"}}for="other-gender">Other</label>
                                </div>
                            </div>
                            <p className="app-err row">{err4}</p>
                            <div className="row">
                                <div className="form-floating">
                                    <select className="form-control" id="float4" value={specialization} onChange={(e)=>setSpecialization(e.target.value)} placeholder={specialization}>
                                    <option value="">Select Specialization</option>
                                    <option value="Psychiatrist">Psychiatrist</option>
                                    <option value="Oncologist">Oncologist</option>
                                    <option value="Physiologist">Physiologist</option>
                                    <option value="Opthamologist">Opthamologist</option>
                                    <option value="Cardiologist">Cardiologist</option>
                                    <option value="Neurologist">Neurologist</option>
                                    <option value="Dermatologist">Dermatologist</option>
                                    <option value="Gynecologist">Gynecologist</option>
                                    <option value="Pediatrician">Pediatrician</option>
                                    <option value="Gastroenterologist">Gastroenterologist</option>
                                    <option value="Pathologist">Pathologist</option>
                                    <option value="Nephrologist">Nephrologist</option>
                                    <option value="Podiatrist">Podiatrist</option>
                                </select>
                                <label for="float4">Specialization</label>
                                </div>
                            </div>
                            <p className="app-err row">{err5}</p>
                            <div className="row">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="float5" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                                    <label for="float5">Description</label>
                                </div>
                            </div>
                            <p className="app-err row">{err6}</p>
                            <div className="row">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="float6" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                                    <label for="float6">Address</label>
                                </div>
                            </div>
                            <p className="app-err row">{err7}</p>
                            <div className="row">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="float7" value={location}  onChange={(e)=>setLocation(e.target.value)}/>
                                    <label for="float7">Location</label>
                                </div>
                            </div>
                            <p className="app-err row">{err8}</p>
                            <div className="row">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="float8" value={phoneNumber}  onChange={(e)=>setPhoneNumber(e.target.value)}/>
                                    <label for="float8">Phone Number</label>
                                </div>
                            </div>
                            <p className="app-err row">{err9}</p>
                                <div className="row">
                                    <div className="form-floating">
                                        <select className="form-control"  id="float9" value={availability}  onChange={(e)=>setAvailability(e.target.value)}>
                                        <option value="">Select Availability</option>
                                        <option value="available">Available</option>
                                        <option value="unavailable">Unavailable</option>
                                        </select>
                                        <label for="float9">Availability</label>
                                    </div>
                                </div>
                                <p className="app-err row">{err10}</p>
                                <div className="row">
                                    <div className="form-floating">
                                        <input type="file" className="form-control" id="float10" onChange={(e)=>{var a=(e.target.value);setImage(a.replace("C:\\fakepath\\", "../"));}}/>
                                        <label for="float10">Avatar</label>
                                    </div>
                                </div>
                                <p className="app-err row">{err11}</p>
                                <div className="row">
                                    <div className="form-floating">
                                        <input type="number" className="form-control" id="float11" value={fees}  onChange={(e)=>setFees(e.target.value)}/>
                                        <label for="float11">Fees</label>
                                    </div>
                                </div>
                                <p className="app-err row">{err12}</p>
                                <div className='row update-div'>
                                    <a className="update-doctor" onClick={()=>{funEditDoctor(doctor[0].id);}}>Update</a>
                                </div>
                                <p className="mt-3 row app-err" style={{color:(updateMessage.includes("Updated Successfully!"))?"green":"red"}}>{updateMessage}</p>
                        </div>
                    </div>
                </div>
            </div>

            
            {/*Modal3-Delete Doctor*/}
            <div className="modal fade" id="staticBackdrop7" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Delete Doctor</h1>
                            <a className="col-1"  data-bs-dismiss="modal" onClick={()=>setDelMsg("")}><i className="fa-solid fa-x"></i></a>
                        </div>
                        <div className="modal-body py-5 d-flex flex-column">
                            <h6>Are you sure you want to delete this doctor?</h6>
                            <div className='d-flex flex-row mt-3'>
                                <a className='del-user me-5' onClick={()=>{funDeleteDoctor(doctor[0].id)}}>Yes</a>
                                <a className='del-user' data-bs-dismiss="modal" onClick={()=>setDelMsg("")}>No</a>
                            </div>
                            <p className="app-err mt-4" style={{fontSize:"13px",color:(delMsg.includes("Deleted Successfully!"))?"green":"red"}}>{delMsg}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/*Modal4-Add new Doctor*/}
            <div className="modal fade edit-doctor-section" id="staticBackdrop8" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Doctor</h1>
                            <a className="col-1"  data-bs-dismiss="modal" onClick={addClear}><i className="fa-solid fa-x"></i></a>
                        </div>
                        <div className="modal-body d-flex flex-column py-5">
                             <div className="row">
                                 <div className="form-floating">
                                    <input type="text" className="form-control" id="floating1"  onChange={(e)=>setFirstName(e.target.value)}/>
                                    <label for="floating1">FirstName</label>
                                </div>
                            </div>
                            <p className="app-err row">{err1}</p>
                            <div className="row">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floating2"  onChange={(e)=>setLastName(e.target.value)}/>
                                    <label for="floating2">LastName</label>
                                </div>
                            </div>
                            <p className="app-err row">{err2}</p>
                            <div className="row">
                                <div className="form-floating">
                                    <input type="email" className="form-control" id="floating3"  onChange={(e)=>setEmail(e.target.value)}/>
                                    <label for="floating3">Email ID</label>
                                </div>
                            </div>
                            <p className="app-err row">{err3}</p>
                            <div className="row">
                                <div className="d-flex flex-row align-center">
                                    <input type="radio" className='ms-3' name="gender" id="male-gender" value="male" onChange={(e)=>setGender(e.target.value)}/>
                                    <label style={{color:"snow"}} for="male-gender">Male</label>
                                    <input type="radio" className='ms-3' name="gender" id="female-gender" value="female" onChange={(e)=>setGender(e.target.value)}/>
                                    <label style={{color:"snow"}} for="female-gender">Female</label>
                                    <input type="radio" className='ms-3' name="gender" id="other-gender" value="other" onChange={(e)=>setGender(e.target.value)}/>
                                    <label style={{color:"snow"}} for="other-gender">Other</label>
                                </div>
                            </div>
                            <p className="app-err row">{err4}</p>
                            <div className="row">
                                <div className="form-floating">
                                    <select className="form-control" id="floating4"  onChange={(e)=>setSpecialization(e.target.value)}>
                                    <option value="">Select Specialization</option>
                                    <option value="Psychiatrist">Psychiatrist</option>
                                    <option value="Oncologist">Oncologist</option>
                                    <option value="Physiologist">Physiologist</option>
                                    <option value="Opthamologist">Opthamologist</option>
                                    <option value="Cardiologist">Cardiologist</option>
                                    <option value="Neurologist">Neurologist</option>
                                    <option value="Dermatologist">Dermatologist</option>
                                    <option value="Gynecologist">Gynecologist</option>
                                    <option value="Pediatrician">Pediatrician</option>
                                    <option value="Gastroenterologist">Gastroenterologist</option>
                                    <option value="Pathologists">Pathologists</option>
                                    <option value="Nephrologists">Nephrologists</option>
                                    <option value="Podiatrists">Podiatrists</option>
                                </select>
                                <label for="floating4">Specialization</label>
                                </div>
                            </div>
                            <p className="app-err row">{err5}</p>
                            <div className="row">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floating5"  onChange={(e)=>setDescription(e.target.value)}/>
                                    <label for="floating5">Description</label>
                                </div>
                            </div>
                            <p className="app-err row">{err6}</p>
                            <div className="row">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floating6"  onChange={(e)=>setAddress(e.target.value)}/>
                                    <label for="floating6">Address</label>
                                </div>
                            </div>
                            <p className="app-err row">{err7}</p>
                            <div className="row">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floating7"  onChange={(e)=>setLocation(e.target.value)}/>
                                    <label for="floating7">Location</label>
                                </div>
                            </div>
                            <p className="app-err row">{err8}</p>
                            <div className="row">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floating8"  onChange={(e)=>setPhoneNumber(e.target.value)}/>
                                    <label for="floating8">Phone Number</label>
                                </div>
                            </div>
                            <p className="app-err row">{err9}</p>
                                <div className="row">
                                    <div className="form-floating">
                                        <select className="form-control"  id="floating9"  onChange={(e)=>setAvailability(e.target.value)}>
                                        <option value="">Select Availability</option>
                                        <option value="available">Available</option>
                                        <option value="unavailable">Unavailable</option>
                                        </select>
                                        <label for="floating9">Availability</label>
                                    </div>
                                </div>
                                <p className="app-err row">{err10}</p>
                                <div className="row">
                                    <div className="form-floating">
                                        <input type="file" className="form-control" id="floating10"  onChange={(e)=>{var a=(e.target.value);setImage(a.replace("C:\\fakepath\\", "../"));}}/>
                                        <label for="floating10">Avatar</label>
                                    </div>
                                </div>
                                <p className="app-err row">{err11}</p>
                                <div className="row">
                                    <div className="form-floating">
                                        <input type="number" className="form-control" id="floating11"  onChange={(e)=>setFees(e.target.value)}/>
                                        <label for="floating11">Fees</label>
                                    </div>
                                </div>
                                <p className="app-err row">{err12}</p>
                                <div className='row update-div'>
                                    <a className="update-doctor" onClick={()=>funAddDoctor()}>Add</a>
                                </div>
                                <p className="mt-3 row app-err" style={{color:(addMessage.includes("Added Successfully!"))?"green":"red"}}>{addMessage}</p>
                            </div>
                        </div>
                    </div>
                   </div>
        </section>
    </section>
   );
}
export default DoctorListTable;