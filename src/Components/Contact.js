import { useState } from "react";
import axios from "axios";
const Contact=()=>{
    const [name,setName]=useState("");
    const [mail,setMail]=useState("");
    const [msg,setMsg]=useState("");
    const [err1,setErr1]=useState("");
    const [err2,setErr2]=useState("");
    const [err3,setErr3]=useState("");
    const [sendErr,setSendErr]=useState("");
    const emailRegEx=new RegExp(/^[a-zA-Z0-9.]+@[a-zA-Z]+.[A-Za-z]{2,}$/);
    const nameRegEx=new RegExp(/^[a-zA-Z]*$/);
    const msgRegEx=new RegExp(/^[a-zA-Z0-9]*$/);
   const [docplusMessage,setDocplusMessgae]=useState({
        senderName:"",
        senderEmail:"",
        senderMessage:"",
        msgTimeStamp:""
    });
    async function sendMessage()
    {
        var fl1,fl2,fl3;
        const senderName=name;
        const senderEmail=mail;
        const senderMessage=msg;
        const date1=new Date();
        const msgTimeStamp=date1.getDate()+"-"+(date1.getMonth()+1)+"-"+date1.getFullYear()+", "+
        date1.getHours()+":"+date1.getMinutes();
        setErr1(""); setErr2(""); setErr3("");setSendErr("");
        (name.trim()==="" || name.length < 3 || !nameRegEx.test(name) )?setErr1("Name must be atleast 3 alphabets & atmost 15 alphabets"):fl1=true;
        (mail.trim()==="" || !emailRegEx.test(mail))?setErr2("Please enter valid email address!"):fl2=true;
        (msg.trim()==="" || msg.length < 20 )?setErr3("Please enter the message!"):fl3=true;
        if(fl1===true    &&  fl2===true   &&  fl3===true)
        {
            try
            {
                const res=await axios.post("http://localhost:8080/docplus.in/storeMessage",{
                    senderName,
                    senderEmail,
                    senderMessage,
                    msgTimeStamp
                })
                console.log(res.data);
                setDocplusMessgae({
                    senderName:senderName,
                    senderEmail:senderEmail,
                    senderMessage:senderMessage,
                    msgTimeStamp:msgTimeStamp
                });
                document.getElementById("floatingInput1").value="";
                document.getElementById("floatingInput2").value="";
                document.getElementById("floatingTextarea2").value="";
                setSendErr("Message sent Successfully!");
                setName("");setMail("");setMsg("");
            }
            catch(error)
            {
                document.getElementById("floatingInput1").value="";
                document.getElementById("floatingInput2").value="";
                document.getElementById("floatingTextarea2").value="";
                setSendErr("Message sending Failed!");
                setName("");setMail("");setMsg("");
            }
        }
    }
    

    return(
       <section className="container-fluid contact-section py-5">
            <h3 className="mb-5">Contact Us</h3>
            <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput1" placeholder="Type your name" onChange={(e)=>setName(e.target.value)}/>
                <label for="floatingInput1">Your Name</label>
            </div>
            <p className="app-err">{err1}</p>
            <div class="form-floating">
                <input type="email" className="form-control" id="floatingInput2" placeholder="Type your email ID" onChange={(e)=>setMail(e.target.value)}/>
                <label for="floatingInput2">Your Email</label>
            </div>
            <p className="app-err">{err2}</p>
            <div className="form-floating">
                <textarea className="form-control" placeholder="Type description" id="floatingTextarea2" style={{height: "100px"}} onChange={(e)=>setMsg(e.target.value)}></textarea>
                <label for="floatingTextarea2">Description</label>
            </div>
            <p className="app-err">{err3}</p>
            <a className="send-msg mb-3" onClick={sendMessage}>Send Message</a>
            <p className="app-err" style={{color:((sendErr).includes("Message sent Successfully!"))?"green":"red"}} >{sendErr}</p>    
       </section>
    );
};
export default Contact;