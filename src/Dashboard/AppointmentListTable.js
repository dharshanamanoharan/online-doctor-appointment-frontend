import React, {  useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { CurrentAppointment } from '../Redux/Actions/AppointmentAction';
import { useDispatch, useSelector } from 'react-redux';
const AppointmentListTable=()=>{
    const appAvatar="../approved.jpg";
    const pendingAvatar="../waitingforapproval.svg";
    const declinedAvatar="../declined.svg";

    const dispatch=useDispatch();
    const appointment=useSelector((state)=>state.appointment)
    //console.log("Appointment from reducer",appointment);

     //Getting Appointment List
     const [appointmentData,setAppointmentData]=useState([]);

     const getAllAppointments=async()=>{
        try
        {
            const res=await axios.get("http://localhost:8080/docplus.in/all-appointments");
            setAppointmentData(res.data);
            //console.log(res.data);
        }
        catch(error)
        {
            console.log(error);
        }
     }
     useEffect(()=>{getAllAppointments();},[funEditAppointment]);


    //Creating rows of the table
    const rows=[];
    
    for(var i=0;i<appointmentData.length;i++)
    {
        rows[i]=createData(
            appointmentData[i].appointmentId,
            appointmentData[i].userId,
            appointmentData[i].userFirstName+" "+
            appointmentData[i].userLastName,
            appointmentData[i].userEmail,
            appointmentData[i].doctorId,
            appointmentData[i].doctorFirstName+" "+
            appointmentData[i].doctorLastName,
            appointmentData[i].doctorEmail,
            appointmentData[i].doctorContactNumber,
            appointmentData[i].doctorAddress,
            appointmentData[i].patientFirstName+" "+
            appointmentData[i].patientLastName,
            appointmentData[i].patientEmail,
            appointmentData[i].patientContactNumber,
            appointmentData[i].patientVisitReason,
            appointmentData[i].patientGender,
            appointmentData[i].patientAge,
            appointmentData[i].slotDate,
            appointmentData[i].slotTime,
            appointmentData[i].status,
            appointmentData[i].amountPaid,
            appointmentData[i].paymentID,
            /*appointmentData[i].orderID,*/
           )
    }
    //console.log("rows:",rows);
      
    //Creating columns of the table
    const columns = [
        {label: 'AppointmentID',id:"appointmentId"},
        {label: 'UserID',id:"userId"},
        {label: 'UserName',id:"userName"},
       /* {label: 'User_Last_Name',id:"userLastName"},*/
        {label: 'UserEmail',id:"userEmail"},
        {label: 'DoctorID',id:"doctorId"},
        {label: 'DoctorName',id:"doctorName"},
       /*{label: 'Doctor_Last_Name',id:"doctorLastName"},*/
        {label: 'DoctorEmail',id:"doctorEmail"},
        {label: 'DoctorContactNumber',id:"doctorContactNumber"},
        {label: 'DoctorAddress',id:"doctorAddress"},
        {label: 'PatientName',id:"patientName"},
       /* {label: 'Patient_Last_Name',id:"patientLastName"},*/
        {label: 'PatientEmail',id:"patientEmail"},
        {label: 'PatientContactNumber',id:"patientContactNumber"},
        {label: 'PatientVisitReason',id:"patientVisitReason"},
        {label: 'PatientGender',id:"patientGender"},
        {label: 'PatientAge',id:"patientAge"},
        {label: 'SlotDate',id:"slotDate"},
        {label: 'SlotTime',id:"slotTime"},
        {label: 'Status',id:"status"},
        {label: 'AmountPaid',id:"amountPaid"},
        {label: 'PaymentID',id:"paymentID"},
        /*{label: 'OrderID',id:"orderID"},    */
    ];
    

    function createData(appointmentId,userId,userName,userEmail,
    doctorId,doctorName,doctorEmail,doctorContactNumber,doctorAddress,
    patientName,patientEmail,patientContactNumber,patientVisitReason,
    patientGender,patientAge,slotDate,slotTime,status,amountPaid,paymentID,orderID)
     {
        return {appointmentId,userId,userName,userEmail,
            doctorId,doctorName,doctorEmail,doctorContactNumber,doctorAddress,
            patientName,patientEmail,patientContactNumber,patientVisitReason,
            patientGender,patientAge,slotDate,slotTime,status,amountPaid,paymentID,orderID };
    }
     
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => 
    {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //Update the appointment
    const [updateMsg,setUpdateMsg]=useState("");
    async function funEditAppointment(id,msg)
    {
        const appointmentId=id;
        const status=msg;
        try{
            const res=await axios.put("http://localhost:8080/docplus.in/appointment/"+id,{
               appointmentId,
               status
            });
            //console.log(res.data); 
            setUpdateMsg("Updated Successfully!");
        }
        catch(error)
        {
            console.log(error);
            setUpdateMsg("Updation Failed!");
        }
    }
    return(
        <section className='container-fluid p-5' style={{backgroundColor:"#1a1a1a",color:"snow",height:"100vh"}}>
        <h5 style={{textAlign:"center"}} className='mb-4'> APPOINTMENTS LIST</h5>
            <Paper sx={{ width: '100%', overflow: 'hidden' }} >

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
                        <TableCell style={{backgroundColor:"black",color:"snow"}}>Approve</TableCell>
                        <TableCell style={{backgroundColor:"black",color:"snow"}}>Decline</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row,i) => {var appointmentId;var appstatus;
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                                {columns && columns.map((column) => {
                                const value = row[column.id];
                                appointmentId=row["appointmentId"];
                                appstatus=row["status"];
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
                                    <button className="view-appointment" onClick={()=>{(dispatch(CurrentAppointment(appointmentData,appointmentId)));}}  data-bs-toggle="modal" data-bs-target="#staticBackdrop9">
                                        <i className="fa-solid fa-eye"></i>
                                    </button>
                                </TableCell>
                                <TableCell style={{backgroundColor:((i)%2===0)?"rgb(41, 39, 39)":"rgb(41, 39, 39)",color:"snow"}}>
                                    <button className="edit-appointment" style={{display:(appstatus==="pending for approval")?"block":"none"}} onClick={()=>{(dispatch(CurrentAppointment(appointmentData,appointmentId)));}} data-bs-toggle="modal" data-bs-target="#staticBackdrop10">
                                        <i className="fa-solid fa-check"></i>
                                    </button>
                                </TableCell>
                                <TableCell style={{backgroundColor:((i)%2===0)?"rgb(41, 39, 39)":"rgb(41, 39, 39)",color:"snow"}}>
                                    <button className="delete-appointment" style={{display:(appstatus==="pending for approval")?"block":"none"}} onClick={()=>{(dispatch(CurrentAppointment(appointmentData,appointmentId)));}} data-bs-toggle="modal" data-bs-target="#staticBackdrop11">
                                        <i className="fa-solid fa-x"></i>
                                    </button>
                                </TableCell>
                            </TableRow>
                       );})}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{color:"snow",backgroundColor:"black"}}
                />
               </Paper>

               <section className="admin-panel-appointments">
               {/*Modal1-View Appointment*/}
                  <div className="modal" id="staticBackdrop9" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog ">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Appointment</h1>
                            <a className="col-1"  data-bs-dismiss="modal"><i className="fa-solid fa-x"></i></a>
                        </div>
                        <div className="modal-body ">
                        
                            <div className=" card pb-2" >
                                    <img src={(appointment[0].status.toLowerCase()==="pending for approval")?"http://localhost:3000/"+pendingAvatar:(appointment[0].status==="approved")?"http://localhost:3000/"+appAvatar:"http://localhost:3000/"+declinedAvatar} className='card-img-top img-fluid' />
                                    <div className="card-body view-profile">
                                        <p><span>Appointment ID : </span>{appointment[0].appointmentId}</p>
                                        <p><span>Doctor Name: </span>{appointment[0].doctorFirstName} {appointment[0].doctorLastName}</p>
                                        <p><span>Patient Name: </span>{appointment[0].patientFirstName} {appointment[0].patientLastName}</p>
                                        <p><span>patientVisitReason: </span>{appointment[0].patientVisitReason}</p>
                                        <p><span>Appointment Date: </span>{appointment[0].slotDate}</p>
                                        <p><span>Appointment Time: </span>{appointment[0].slotTime}</p>
                                        <p><span>Amount Paid: </span>Rs.{appointment[0].amountPaid}</p>
                                        <p><span>Appointment Status: </span>{appointment[0].status}</p>
                                    </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/*Modal2-Approve Appointment*/}
                    <div className="modal fade" id="staticBackdrop10" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Approve appointment</h1>
                                <a className="col-1"  data-bs-dismiss="modal" onClick={()=>setUpdateMsg("")}><i className="fa-solid fa-x"></i></a>
                            </div>
                            <div className="modal-body py-5 d-flex flex-column">
                                <h6>Are you sure you want to approve this appointment?</h6>
                                <div className='d-flex flex-row mt-3'>
                                    <a className='update-appointment me-5' onClick={()=>{funEditAppointment(appointment[0].appointmentId,"approved")}}>Yes</a>
                                    <a className='update-appointment' data-bs-dismiss="modal" onClick={()=>setUpdateMsg("")}>No</a>
                                </div>
                                <p className="app-err mt-4" style={{fontSize:"13px",color:(updateMsg.includes("Updated Successfully!"))?"green":"red"}}>{updateMsg}</p>
                            </div>
                        </div>
                    </div>
                </div>

                 {/*Modal3-Decline Appointment*/}
                 <div className="modal fade" id="staticBackdrop11" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Decline appointment</h1>
                                <a className="col-1"  data-bs-dismiss="modal" onClick={()=>setUpdateMsg("")}><i className="fa-solid fa-x"></i></a>
                            </div>
                            <div className="modal-body py-5 d-flex flex-column">
                                <h6>Are you sure you want to decline this appointment?</h6>
                                <div className='d-flex flex-row mt-3'>
                                    <a className='update-appointment me-5' onClick={()=>{funEditAppointment(appointment[0].appointmentId,"declined")}}>Yes</a>
                                    <a className='update-appointment' data-bs-dismiss="modal" onClick={()=>setUpdateMsg("")}>No</a>
                                </div>
                                <p className="app-err mt-4" style={{fontSize:"13px",color:(updateMsg.includes("Updated Successfully!"))?"green":"red"}}>{updateMsg}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );

}
export default AppointmentListTable;