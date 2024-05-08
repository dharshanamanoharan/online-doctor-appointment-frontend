import { useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { useState,useEffect} from "react";
import axios from "axios";
import { GetUserId } from "../AuthService/AuthenticationService";
const AppointmentForm=()=>{
    const navigator=useNavigate();
    const doctorId1=useParams();
    const doctorId=doctorId1.doctorId;
    const userId=GetUserId();
    const booking_=useSelector((state)=>state.booking);
    //console.log("Booking",booking_);
    const day=new Date(sessionStorage.getItem("bookingDate")).getDate();
    const month=new Date(sessionStorage.getItem("bookingDate")).getMonth()+1;
    const year=new Date(sessionStorage.getItem("bookingDate")).getFullYear();
    const slot=sessionStorage.getItem("bookingTime");
    //console.log(sessionStorage.getItem("bookingTime"));
    const [slotTime,setSlotTime]=useState();
    //console.log("Param in Appointment Form Page",doctorId1);
    
        //Setting slot time for convenience
        const slotTimeFun=()=>{
          (slot==="slot1")?setSlotTime("10.00 A.M"):
          (slot==="slot2")?setSlotTime("10.30 A.M"):
          (slot==="slot3")?setSlotTime("11.00 A.M"):
          (slot==="slot4")?setSlotTime("11.30 A.M"):
          (slot==="slot5")?setSlotTime("12.00 P.M"):
          (slot==="slot6")?setSlotTime("12.30 P.M"):
          (slot==="slot7")?setSlotTime("04.00 P.M"):
          (slot==="slot8")?setSlotTime("4.30 P.M"):
          (slot==="slot9")? setSlotTime("5.00 P.M"):
          (slot==="slot10")? setSlotTime("5.30 P.M"):
          (slot==="slot11")? setSlotTime("6:00 P.M"):
          (slot==="slot12")? setSlotTime("6.30 P.M"):setSlotTime("")
        };
    
    //Get Doctor
    const [doctor,setDoctor]=useState({fees:0});
    const getDoctor=async()=>{
      try{
        const res=await axios.get("http://localhost:8080/docplus.in/doctor/"+doctorId);
        //console.log(res.data);
        setDoctor(res.data);  
      }
      catch(error)
      {
        console.log(error);
      }
    };
    useEffect(()=>
    {
      getDoctor();
      slotTimeFun();
    }, []);
    
    
    //To Store values of input field
     const [name1,setName1]=useState("");
     const [name2,setName2]=useState("");
     const [email,setEmail]=useState("");
     const [num,setNum]=useState("");
     const [reason,setReason]=useState("");
     const [age,setAge]=useState("");
     const[gender,setGender]=useState("");
    
    //To display error on validation
    const [err1,setErr1]=useState("");
    const [err2,setErr2]=useState("");
    const [err3,setErr3]=useState("");
    const [err4,setErr4]=useState("");
    const [err5,setErr5]=useState("");
    const [err6,setErr6]=useState("");
    const [err7,setErr7]=useState("");

    //RegeEx for validation
   const emailRegEx=new RegExp(/^[a-zA-Z0-9.]+@[a-zA-Z]+.[A-Za-z]{2,}$/);
   const nameRegEx=new RegExp(/^[a-zA-Z]*$/);
   const phoneRegEx=new RegExp(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/);
   const messageRegEx=new RegExp(/[a-zA-Z]/);
    
   
  //Payment
  const handlePayment =() => {
    setErr1("");setErr2("");setErr3("");setErr4("");
    setErr5("");setErr6("");setErr7("");
    var g=document.getElementsByName("gender");
    var fl1,fl2,fl3,fl4,fl5,fl6,fl7;
    for(var i=0;i<g.length;i++)
    {
      if(g[i].checked)
      {
        setGender(g[i].value);
        fl7=true;
        break;
      }
    }
    
    //Ternary
    (name1.trim()==="" || name1.length<3 || !nameRegEx.test(name1) )?setErr1("Name must be atleast 3 alphabets & atmost 15 alphabets"):fl1=true;
    (name2.trim()==="" || name2.length<3 || !nameRegEx.test(name2))?setErr2("Name must be atleast 3 alphabets & atmost 15 alphabets"):fl2=true;
    (email.trim()==="" || !emailRegEx.test(email))?setErr3("Please enter valid email address!"):fl3=true;
    (num.trim()==="" ||  num.length<10 || num.length>10 || !phoneRegEx.test(num))?setErr4("Please enter valid phone number!"):fl4=true;
    (reason.trim()==="" || reason.length<7 || reason.length>30 || !messageRegEx.test(reason) )?setErr5("Please enter the reason for visit like 'general' or 'specific'!"):fl5=true;
    (age.trim()==="" || age<0 || age>110)?setErr6("Please enter the correct age!"):fl6=true;
    (fl7!==true)?setErr7("Please select the gender!"):fl7=true;
    console.log("Flag Values:"+fl1,fl2,fl3,fl4,fl5,fl6,fl7);
    console.log("Field Values:",name1,name2,email,num,reason,gender,age);
    if(fl1===true && fl2===true && fl3===true && fl4===true && fl5===true && fl6===true && fl7===true)
    {
      const order = async()=>{
      try{
          const res1=await axios.get("http://localhost:8080/docplus.in/payment/"+doctor.fees*100);
          sessionStorage.setItem("orderID",res1.data);
          console.log("Order ID from backend",res1.data);
          console.log("from session in try block", sessionStorage.getItem("orderID"));
          console.log("Order ID stored from backend",sessionStorage.getItem("orderID"));
          navigator(`/docplus.in/payment-message/${"success"}`);
        }
      catch(error)
        {
          console.log(error);
        }
    }
    const options = {
    key: "rzp_test_Fyb4j1GCPpuGUL",
    amount: doctor.fees*100, 
    currency: "INR",
    name: "DocPlus",
    description: "Test Transaction",
    image: "https://idoctor.kz/images/medcenters/3001/2802/pbE2Uf1vJk4CVS05c1YdxH2DB6en9cGmc8zyuBse_180xauto.png",
    order_id: order, 
    handler: async function (response) {
       order();
      //console.log("Razorpay Response",response);
      const patientFirstName=name1;
      const patientLastName=name2;
      const patientEmail=email;
      const patientContactNumber=num;
      const patientVisitReason=reason;
      const patientGender=gender;
      const patientAge=age;
      const amountPaid=doctor.fees;
      const paymentID=response.razorpay_payment_id;
      const orderID=sessionStorage.getItem("orderID");
      //console.log("final orderID",orderID);
      const res2=await axios.post("http://localhost:8080/docplus.in/book-appointment",{userId,doctorId,day,month,year,slot,slotTime,patientFirstName,patientLastName,patientEmail,patientContactNumber,patientAge,patientGender,patientVisitReason,amountPaid,paymentID,orderID});
      sessionStorage.removeItem("orderID");
    },
    prefill: {
      name: name1,
      email: email,
      contact: num,
    },
    notes: {
      address: "Mumbai",
    },
    theme: {
      color: "#494A80",
    },
  };
  const razorpay1 = new window.Razorpay(options);
  razorpay1.on("payment.failed", function (response) {
    navigator(`/docplus.in/payment-message/${"failure"}`);
  });
  razorpay1.open();
}
};
    return(
        <> 
          <div className="container-fluid appointment-section  p-5">
            <div className="container">
              <div className="row row-cols-md-2 row-cols-1">
                <div className="col mx-5">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="floatingInput1" placeholder="" onChange={(e)=>setName1(e.target.value)} />
                    <label for="floatingInput1">First Name</label>
                  </div>
                  <p className="app-err">{err1}</p>
                </div>
                <div className="col mx-5">
                    <div class="form-floating">
                      <input type="text" class="form-control" id="floatingInput2" placeholder="" onChange={(e)=>setName2(e.target.value)} />
                      <label for="floatingInput2">Last Name</label>
                    </div>
                    <p className="app-err">{err2}</p>
                </div>
              </div>
              <div className="row row-cols-md-2 row-cols-1">
                <div className="col mx-5">
                  <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput3" placeholder="" onChange={(e)=>setEmail(e.target.value)} />
                    <label for="floatingInput3">Email</label>
                  </div>
                  <p className="app-err">{err3}</p>
                </div>
                <div className="col mx-5">
                    <div className="form-floating">
                      <input type="number" className="form-control" id="floatingInput4" placeholder="" onChange={(e)=>setNum(e.target.value)} />
                      <label for="floatingInput4">Phone Number</label>
                    </div>
                    <p className="app-err">{err4}</p>
                </div>
              </div>
              <div className="row row-cols-md-2 row-cols-1">
                <div className="col mx-5">
                  <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInput5" placeholder="" onChange={(e)=>setReason(e.target.value)} />
                    <label for="floatingInput5">Visit Reason</label>
                  </div>
                  <p className="app-err">{err5}</p>
                </div>
                <div className="col mx-5">
                    <div className="form-floating">
                      <input type="number" className="form-control" id="floatingInput6" placeholder="" onChange={(e)=>setAge(e.target.value)} />
                      <label for="floatingInput6">Age</label>
                    </div>
                    <p className="app-err">{err6}</p>
                </div>
              </div>
              <div className="row row-cols-md-2 row-cols-1">
                <div className="col mx-5">
                  <div className="form-floating">
                    <input disabled="true" value={sessionStorage.getItem("bookingDate")} type="text" class="form-control" id="floatingInput7" placeholder=""/>
                    <label for="floatingInput7">Appointment Date</label>
                  </div>
                </div>
                <div className="col mx-5">
                    <div className="form-floating">
                      <input disabled="true" value={sessionStorage.getItem("bookingTime")+" - "+slotTime} type="text" class="form-control" id="floatingInput8" placeholder=""/>
                      <label for="floatingInput8">Appointment Slot</label>
                    </div>
                </div>
              </div>
              <div className="col mx-5 gender-input1 my-4">
                    <div className="form-floating">
                      <input disabled="true" value={"Rs."+doctor.fees} type="text" class="form-control" id="floatingInput9" placeholder=""/>
                      <label for="floatingInput9">Doctor Fee</label>
                    </div>
                </div>
              </div>
              <div className='gender-input1 my-4'>
                <div className="gender-input mx-2">
                  <input type="radio" name="gender" id="gender1" value="male" onChange={(e)=>setGender(e.target.value)}/>
                  <label className="mx-1" for="#gender1">Male</label>
                </div>
                <div className="gender-input mx-2">
                  <input type="radio" name="gender" id="gender2" value="female" onChange={(e)=>setGender(e.target.value)}/>
                  <label className="mx-1" for="#gender2">Female</label>
                </div>
                <div className="gender-input mx-2">
                  <input type="radio" name="gender" id="gender3" value="other" onChange={(e)=>setGender(e.target.value)}/>
                  <label className="mx-1" for="#gender3">Other</label>
                </div>
              </div>
              <div className='row'> 
                <p className="app-err">{err7}</p>
              </div>
              <div className='row my-4'>
                  <a onClick={handlePayment} className="confirm-pay">Confirm & Pay</a>
              </div>
            </div>
          
        </>
    );
}
export default AppointmentForm;