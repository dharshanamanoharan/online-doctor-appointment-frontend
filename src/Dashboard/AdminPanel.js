
import { useEffect,useState} from "react";
import UserListTable from "./UserListTable";
import DoctorListTable from "./DoctorListTable";
import AppointmentListTable from "./AppointmentListTable";
import MessageList from "./MessageList";
import axios from "axios";
import CanvasJSReact from '@canvasjs/react-charts';
const AdminPanel=()=>{
    const[usersData,setUsersData]=useState();
    const[regUserCount,setRegUserCount]=useState();
    const[activatedUserCount,setActivatedUserCount]=useState();
    const[docData,setDocData]=useState();
    const[docCount,setDocCount]=useState();
    const[availableDoc,setAvailableDoc]=useState();
    const[appointmentData,setAppointmentData]=useState();
    const[appointmentCount,setAppointmentCount]=useState();
    const[pendingApp,setPendingApp]=useState();
    const[approvedApp,setApprovedApp]=useState();
    const[declinedApp,setDeclinedApp]=useState();

    async function user(){
        try{
            const res=await axios.get("http://localhost:8080/docplus.in/users-list");
            //console.log(res.data.length);
            setRegUserCount(res.data.length);
            setUsersData(res.data);
            //console.log("all users",res.data);
            var actUsers=(res.data.filter((e)=>
                {return e.enabled===true}))
            //console.log("activated users",actUsers);
            setActivatedUserCount(actUsers.length);
        }
        catch(error)
        {
            console.log(error);
        }
    }
   async function doc(){
        try{
            const res=await axios.get("http://localhost:8080/docplus.in/doctors-list");
            //console.log(res.data);
            setDocData(res.data);
            //console.log("All Doctors",res.data);
            setDocCount(res.data.length);
            var avail=res.data.filter((e)=>{
                return e.availability.toLowerCase()==="available";
            })
            setAvailableDoc(avail.length);
            //console.log("Available Doctors",availableDoc);
            //console.log("Unavailable Doctors",(docCount-availableDoc));
        }
        catch(error)
        {
            console.log(error);
        }
    }
    async function appointment(){
        try{
            const res=await axios.get("http://localhost:8080/docplus.in/all-appointments");
            //console.log(res.data);
            setAppointmentData(res.data);
            //console.log("All Appointments",res.data)
            setAppointmentCount(res.data.length);
            var pending=res.data.filter((e)=>{
                return e.status.toLowerCase()==="pending for approval";
            })
            setPendingApp(pending.length);
            //console.log("Pending for Approval:",pending.length);
            var approved=res.data.filter((e)=>{
                return e.status.toLowerCase()==="approved";
            })
            setApprovedApp(approved.length);
            var declined=res.data.filter((e)=>{
                return e.status.toLowerCase()==="declined";
            })
            setDeclinedApp(declined.length);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    useEffect(()=>{
        user();
        doc();
        appointment();
    },[])

    //Pie Chart
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const userpie ={
        theme: "dark1",
        animationEnabled: true,
        exportFileName: "Users",
        exportEnabled: true,
        width:260,
        height:200,
        title:{
            text: "",
            fontSize: 30,
            fontWeight:"light",
            padding:"40px"
        },
        data: [{
            type: "pie",
            showInLegend: true,
            legendText: "{label}",
            toolTipContent: "{label}: <strong>{y}</strong>",
            indexLabel: "{y}",
            indexLabelPlacement: "inside",
            dataPoints: [
                { y: activatedUserCount, label: "Verified Accounts"},
                { y: (regUserCount-activatedUserCount), label: "Unverified Accounts"},
            ]
        }]
    }
    const doctorpie ={
        theme: "dark1",
        animationEnabled: true,
        exportFileName: "Doctors",
        exportEnabled: true,
        width:260,
        height:200,
        title:{
            text: "",
            fontSize: 30,
            fontWeight:"light",
            padding:"40px"
        },
        data: [{
            type: "pie",
            showInLegend: true,
            legendText: "{label}",
            toolTipContent: "{label}: <strong>{y}</strong>",
            indexLabel: "{y}",
            indexLabelPlacement: "inside",
            dataPoints: [
                { y:availableDoc, label: "Available Doctors"},
                { y: (docCount-availableDoc), label: "Unavailable Doctors"},
            ]
        }]
    }
    const appointmentpie ={
        theme: "dark1",
        animationEnabled: true,
        exportFileName: "Appointments",
        exportEnabled: true,
        width:260,
        height:200,
        title:{
            text: "",
            fontSize: 30,
            fontWeight:"light",
            padding:"40px"
        },
        data: [{
            type: "pie",
            showInLegend: true,
            legendText: "{label}",
            toolTipContent: "{label}: <strong>{y}</strong>",
            indexLabel: "{y}",
            indexLabelPlacement: "inside",
            dataPoints: [
                { y:pendingApp, label: "Pending for approval"},
                { y:declinedApp , label: "Declined"},
                { y:approvedApp , label: "Approved"},
            ]
        }]
    }
  
return(
    <>
        <section className="container-fluid admin-panel-section p-5">
            <div className="container admin-panel-container">
                    <div className="row">
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-dashboard" role="tabpanel" >   
                                <div class="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 row-cols-1 dashboard-container">
                                    <div className="col">
                                        <div>
                                            <h5><i className=" me-3 fa-regular fa-user" />Registered Users </h5>
                                            <h1>{regUserCount}</h1>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <CanvasJSChart options = {userpie}/>
                                            </div>
                                        </div> 
                                    </div>
                                
                                    <div className="col">
                                        <div>
                                            <h5><i className="me-3 fa-solid fa-user-doctor"></i>Doctors</h5>
                                            <h1>{docCount}</h1>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <CanvasJSChart options = {doctorpie}/>
                                            </div>   
                                        </div>      
                                    </div>
                                    <div className="col">
                                        <div>
                                            <h5><i className="me-3 fa-regular fa-calendar-check"></i>Appointments</h5>
                                            <h1>{appointmentCount}</h1>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <CanvasJSChart options = {appointmentpie}/>
                                            </div>
                                        </div>   
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
        </section>
        
    </>
)
}
export default AdminPanel;