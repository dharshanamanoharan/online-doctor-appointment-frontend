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
import { GetUserId } from '../AuthService/AuthenticationService';
const UserActivity=()=>{
    //Getting Appointment List
    const [allAppointmentData,setAllAppointmentData]=useState([]);
    const [appointmentData,setAppointmentData]=useState([]);

    const getAllAppointments=async()=>{
       try
       {
           const res=await axios.get("http://localhost:8080/docplus.in/all-appointments");
           setAllAppointmentData(res.data);
           var myapp=res.data.filter((e)=>{
            var id=GetUserId();
            return e.userId === Number(id);
           });
           setAppointmentData(myapp);
           //console.log("myapp",res.data);
           //console.log("myapp",myapp.length);
       }
       catch(error)
       {
           console.log(error);
       }
    }
    useEffect(()=>{getAllAppointments();},[]);

    //Creating rows of the table
    const rows=[];
    
    for(var i=0;i<appointmentData.length;i++)
    {
        rows[i]=createData(
            appointmentData[i].appointmentId,
            appointmentData[i].doctorId,
            appointmentData[i].doctorFirstName,
            appointmentData[i].doctorLastName,
            appointmentData[i].doctorEmail,
            appointmentData[i].doctorContactNumber,
            appointmentData[i].doctorAddress,
            appointmentData[i].patientFirstName,
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
        {label: 'Appointment_ID',id:"appointmentId"},
        {label: 'Doctor_ID',id:"doctorId"},
        {label: 'Doctor_First_Name',id:"doctorFirstName"},
        {label: 'Doctor_Last_Name',id:"doctorLastName"},
        {label: 'Doctor_Email',id:"doctorEmail"},
        {label: 'Doctor_Contact_Number',id:"doctorContactNumber"},
        {label: 'Doctor_Address',id:"doctorAddress"},
        {label: 'Patient_First_Name',id:"patientFirstName"},
        {label: 'Patient_Last_Name',id:"patientLastName"},
        {label: 'Patient_Email',id:"patientEmail"},
        {label: 'Patient_Contact_Number',id:"patientContactNumber"},
        {label: 'Patient_Visit_Reason',id:"patientVisitReason"},
        {label: 'Patient_Gender',id:"patientGender"},
        {label: 'Patient_Age',id:"patientAge"},
        {label: 'Slot_Date',id:"slotDate"},
        {label: 'Slot_Time',id:"slotTime"},
        {label: 'Status',id:"status"},
        {label: 'Amount_Paid',id:"amountPaid"},
        {label: 'Payment_ID',id:"paymentID"},
       /* {label: 'Order_ID',id:"orderID"},*/
        
    ];
    

    function createData(appointmentId,
    doctorId,doctorFirstName,doctorLastName,doctorEmail,doctorContactNumber,doctorAddress,
    patientFirstName,patientLastName,patientEmail,patientContactNumber,patientVisitReason,
    patientGender,patientAge,slotDate,slotTime,status,amountPaid,paymentID,orderID)
     {
        return {appointmentId,
            doctorId,doctorFirstName,doctorLastName,doctorEmail,doctorContactNumber,doctorAddress,
            patientFirstName,patientLastName,patientEmail,patientContactNumber,patientVisitReason,
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
    return(
        <>
        <section className="my-activity-section container-fluid py-5 px-5" style={{minHeight:"70vh"}}>
            <h1 className='mb-3'>My Appointments</h1>
            {(appointmentData.length>0)?
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                   <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns && columns.map((column) => (
                            <TableCell key={column.id} style={{backgroundColor:"#494A80",color:"snow"}}>
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row,i) => {var appointmentId;var appstatus;
                            return (
                            <TableRow role="checkbox" tabIndex={-1} key={row.code} >
                                {columns && columns.map((column) => {
                                const value = row[column.id];
                                appointmentId=row["appointmentId"];
                                appstatus=row["status"];
                                return (<>
                                    <TableCell key={column.id} style={{backgroundColor:((i)%2===0)?"gainsboro":"white",color:"black"}}>
                                    {column.format && (typeof value === 'number')
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                    </>
                                  );}
                                )} 
                              
                            
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
                    style={{color:"snow",backgroundColor:"#494A80"}}
                />
               </Paper>:
                <div className="no-activity container-fluid py-5 m-0">
                    <h1>No appointments to show !</h1>
               </div>}
        
        

        </section>
        </>
    )
}
export default UserActivity;