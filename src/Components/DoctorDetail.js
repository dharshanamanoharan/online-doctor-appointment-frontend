import axios from "axios";
import {useEffect,useState} from "react";
import {useDispatch} from "react-redux";
import {useParams,useNavigate,Link}from "react-router-dom";
import {GetUserId, isUserLoggedIn } from "../AuthService/AuthenticationService";
import {BOOK_SLOT } from "../Redux/Actions/BookAction";

const DoctorDetail=()=>{
        const dispatch=useDispatch();
        const userId=GetUserId();
       // console.log("User ID:",userId);
        const isAuth=isUserLoggedIn();
        const doctorId1=useParams();
       // console.log("Param in Doctor Detail Page",doctorId1);
        const [doctorInfo,setDoctorInfo]=useState([]);
        const getDoctor=async()=>{
        try{
            const res=await axios.get(`http://localhost:8080/docplus.in/doctor/${doctorId1.doctorId}`);
            setDoctorInfo([res?.data]);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    useEffect(()=>{
        getDoctor();
    },[])
    console.log("Doctor Detail Page",doctorInfo);

    //Booking Slot
    const [bookDate,setBookDate]=useState();
    const [bookTime,setBookTime]=useState();
    const [bookError,setBookError]=useState("");
    const navigator=useNavigate();

    //Setting the current date and disabling past dates
    //var today = new Date().toISOString().split('T')[0];
    //current date should not be shown
    var currentDate1=new Date();
    function addDate(currentDate1)
    {
        const tomorrow=new Date(currentDate1.getTime()+24*60*60*1000);
        return tomorrow;
    }
    var nextDay=addDate(currentDate1).toISOString().split('T')[0];;


    //Booking can be done prior 31 days only. So should disable the future dates accordingly
    //and also should disable the current date
    var currentDate=new Date();
    var totalDays=31;
    function addDays(currentDate, totalDays) {
        const newDate = new Date(currentDate.getTime() 
            + totalDays * 24 * 60 * 60 * 1000);
        return newDate;
    }
    var dateLimit=addDays(currentDate,totalDays).toISOString().split('T')[0];

    //Displaying only available slots for booking
    const [disable1,setDisable1]=useState(true);const [disable2,setDisable2]=useState(true);
    const [disable3,setDisable3]=useState(true);const [disable4,setDisable4]=useState(true);
    const [disable5,setDisable5]=useState(true);const [disable6,setDisable6]=useState(true);
    const [disable7,setDisable7]=useState(true);const [disable8,setDisable8]=useState(true);
    const [disable9,setDisable9]=useState(true);const [disable10,setDisable10]=useState(true);
    const [disable11,setDisable11]=useState(true);const [disable12,setDisable12]=useState(true);
    const handleDate=async(e)=>{
      var d=new Date(e.target.value);
      const doctorId=doctorId1.doctorId;
      const month=d.getMonth()+1;
      //console.log("mon",month);
      const day=d.getDate();
      //console.log("date",day);
        try{
             
            const res=await axios.post("http://localhost:8080/docplus.in/check-availability",
            {
                doctorId,month,day
            });
            //console.log("slots",res.data);
            const slotarr=res.data;
            if(doctorInfo[0].availability==="available")
            {
            for(var i=0;i<slotarr.length;i++)
            {
                (slotarr[i]==="slot1")? setDisable1(false):
                (slotarr[i]==="slot2")? setDisable2(false):
                (slotarr[i]==="slot3")? setDisable3(false):
                (slotarr[i]==="slot4")? setDisable4(false):
                (slotarr[i]==="slot5")? setDisable5(false):
                (slotarr[i]==="slot6")? setDisable6(false):
                (slotarr[i]==="slot7")? setDisable7(false):
                (slotarr[i]==="slot8")? setDisable8(false):
                (slotarr[i]==="slot9")? setDisable9(false):
                (slotarr[i]==="slot10")? setDisable10(false):
                (slotarr[i]==="slot11")? setDisable11(false):
                (slotarr[i]==="slot12")? setDisable12(false):
                setDisable12(true);
            }
            setBookError("");
            }
            else
            {
                setBookError("Dr."+doctorInfo[0].firstName+" "+doctorInfo[0].lastName+" is unavailable! Please check with the doctors who are available!");
                document.getElementById("book-now").disabled=true;
            }
        }
        catch(error)
        {
            console.log(error);
        }

    }


    //Validating the booking slot
    const funValidateBookingSlot=()=>{
       var a = document.getElementsByName("app-time");
       var b = document.getElementsByName("app-date");
       for(var i=0;i<a.length;i++)
       {
        if(a[i].checked && b[0].value<=dateLimit)
        {
            const userId=GetUserId();
            setBookError("");
            const param1={bookTime:bookTime,bookDate:bookDate,userId:userId,doctorId:doctorId1.doctorId}
            sessionStorage.setItem("bookingDate",bookDate);
            sessionStorage.setItem("bookingTime",bookTime);
            dispatch(BOOK_SLOT([param1]))
            navigator(`/docplus.in/appointment-form/${doctorId1.doctorId}`);
        }
        else
        {
            setBookError("Please pick the valid date using date picker and time slot to proceed!");
        }
       }
       //console.log("Booking Time:",bookTime);
       //console.log("Booking Date:",bookDate);
    }
    

    return(
        <>
            <section className="doctor-detail-section container-fluid py-5 px-1" style={{minHeight:"70vh"}}>
                <div className="container doctor-detail-container">
                    <div className="row">
                        {/*Doctor Details*/}
                        <div className="col-lg-8 col-12 doc-col">
                       {doctorInfo && doctorInfo.map((doctor)=>
                        <>
                            <div className="row doc-img py-3 m-1">
                                <img  src={doctor.image} style={{width:"200px",height:"200px"}} />
                            </div>
                            <div className="row">
                                <div className="card-body doc-desc ms-3">
                                <h3>Dr.{doctor.firstName} {doctor.lastName}</h3>
                                <p style={{color:"gray"}}><i className="me-2 fa fa-stethoscope"></i>{doctor.specialization}</p>
                                <p><i className="me-2 fa-solid fa-book-open"></i>{doctor.description}</p>
                                <div className="row doc-detail-address">
                                    <p><i className="me-2 fa fa-map-marker"></i>{doctor.address},{doctor.location}</p>
                                    <p><i className="me-2 fa-solid fa-phone"/>{doctor.phoneNumber}</p>
                                    <p><i className="me-2 fa-solid fa-envelope"/>{doctor.email}</p>
                                </div>
                            </div>
                            </div>
                            </>)}
                        </div>
                       {/*Book Now- Just Selecting date,time and option*/}
                       {(isAuth)?
                        (<div className="col-lg-4 col-12 book-col">
                            <div className="card text-center">
                                <div className="card-header">
                                    <h3 style={{ fontSize:"20px",marginBottom:"0px"}}>Book a visit </h3>
                                </div>
                                <div className="card-body">
                                    <div className="row my-1 date-slot">
                                        <input type="date" min={nextDay} max={dateLimit}  name="app-date" onChange={(e)=>{setBookDate(e.target.value);handleDate(e);}}/>
                                    </div>
                                    <div className="row row-cols-1 row-cols-sm-2 d-flex flex-row">
                                        <div className="my-2 col d-flex flex-column time-slot">
                                            <div>
                                                <input className="slot-ui" disabled={disable1} type="radio" name="app-time" id="slot1" value="slot1" onChange={(e)=>setBookTime(e.target.value)}/>
                                                <label for="slot1" style={{color:(disable1)? "gainsboro":(document.getElementById('slot1').checked)?"green":"black"}}>10.00 A.M</label>
                                            </div>
                                           <div>
                                                <input className="slot-ui" disabled={disable2} type="radio" name="app-time" id="slot2" value="slot2" onChange={(e)=>setBookTime(e.target.value)}/>
                                                <label for="slot2" style={{color:(disable2)? "gainsboro":(document.getElementById('slot2').checked)?"green":"black"}}>10.30 A.M</label>
                                           </div>
                                           <div>
                                                <input className="slot-ui" disabled={disable3} type="radio" name="app-time" id="slot3" value="slot3" onChange={(e)=>setBookTime(e.target.value)}/>
                                                <label for="slot3" style={{color:(disable3)? "gainsboro":(document.getElementById('slot3').checked)?"green":"black"}}>11.00 A.M</label>
                                           </div>
                                           <div>
                                                <input className="slot-ui"  disabled={disable4} type="radio" name="app-time" id="slot4" value="slot4" onChange={(e)=>setBookTime(e.target.value)}/>
                                                <label for="slot4" style={{color:(disable4)? "gainsboro":(document.getElementById('slot4').checked)?"green":"black"}}>11.30 A.M</label>
                                           </div>
                                           <div>
                                                <input className="slot-ui" disabled={disable5} type="radio" name="app-time" id="slot5" value="slot5" onChange={(e)=>setBookTime(e.target.value)}/>
                                                <label for="slot5" style={{color:(disable5)? "gainsboro":(document.getElementById('slot5').checked)?"green":"black"}}>12.00 P.M</label>
                                           </div>
                                           <div>
                                                <input className="slot-ui" disabled={disable6} type="radio" name="app-time" id="slot6" value="slot6" onChange={(e)=>setBookTime(e.target.value)}/>
                                                <label for="slot6" style={{color:(disable6)? "gainsboro":(document.getElementById('slot6').checked)?"green":"black"}}>12.30 P.M</label>
                                           </div>                  
                                        </div>
                                        <div className="my-2 col d-flex flex-column">
                                            <div>
                                                <input className="slot-ui" disabled={disable7} type="radio" name="app-time" id="slot7" value="slot7" onChange={(e)=>setBookTime(e.target.value)}/>
                                                <label for="slot7" style={{color:(disable7)? "gainsboro":(document.getElementById('slot7').checked)?"green":"black"}}>4.00 P.M</label>
                                            </div>
                                            <div>
                                                <input className="slot-ui" disabled={disable8} type="radio" name="app-time" id="slot8" value="slot8" onChange={(e)=>setBookTime(e.target.value)}/>
                                                <label for="slot8" style={{color:(disable8)? "gainsboro":(document.getElementById('slot8').checked)?"green":"black"}}>4.30 P.M</label>
                                            </div>
                                            <div>
                                                <input className="slot-ui" disabled={disable9} type="radio" name="app-time" id="slot9" value="slot9" onChange={(e)=>setBookTime(e.target.value)}/>
                                                <label for="slot9" style={{color:(disable9)? "gainsboro":(document.getElementById('slot9').checked)?"green":"black"}}>5.00 P.M</label>
                                            </div>
                                            <div>
                                                <input className="slot-ui" disabled={disable10} type="radio" name="app-time" id="slot10" value="slot10" onChange={(e)=>setBookTime(e.target.value)}/>
                                                <label for="slot10" style={{color:(disable10)? "gainsboro":(document.getElementById('slot10').checked)?"green":"black"}}>5.30 P.M</label>
                                            </div>
                                            <div>
                                                <input className="slot-ui" disabled={disable11} type="radio" name="app-time" id="slot11" value="slot11" onChange={(e)=>setBookTime(e.target.value)}/>
                                                <label for="slot11" style={{color:(disable11)? "gainsboro":(document.getElementById('slot11').checked)?"green":"black"}}>6.00 P.M</label>
                                            </div>
                                            <div>
                                                <input className="slot-ui" disabled={disable12} type="radio" name="app-time" id="slot12" value="slot12" onChange={(e)=>setBookTime(e.target.value)}/>
                                                <label for="slot12" style={{color:(disable12)? "gainsboro":(document.getElementById('slot12').checked)?"green":"black"}}>6.30 P.M</label>
                                            </div> 
                                        </div>     
                                </div>
                                <p className="row slot-error-msg ">{bookError}</p>                 
                                </div>
                                <div className="card-footer">
                                    <button id="book-now" onClick={funValidateBookingSlot} >Book Now</button>
                                </div>
                                </div>
                        </div>):
                        (<div className="col-lg-4 col-12 sign-to-book p-5">
                            <h4>Please <Link to="/docplus.in/login"> Sign In</Link>
                            <br/>to book an appointment!</h4>
                        </div>)}
                    </div>
                </div>
            </section>
        </>);
}
export default DoctorDetail;
