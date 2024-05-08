import axios from "axios";
import { useState,useEffect } from "react";
import Pagination from '@mui/material/Pagination';
const MessageList=()=>{
    const [msgList,setMsgList]=useState([]);
    async function getMsgList()
    {
        try{
            const res= await axios.get("http://localhost:8080/docplus.in/retrieveMessage");
            //console.log(res.data);
            setMsgList(res.data);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    useEffect(()=>{getMsgList();},[]);
     //Pagination
     const [page, setPage] = useState(1);
     const handleChange = (event, value) => {
       setPage(value);
     };
     const pageCount=Math.ceil(msgList.length/5);
     const itemsPerPage=5
     ;
    return(
        <section className="container-fluid message-dashboard p-5" style={{backgroundColor:"#1a1a1a",color:"snow",height:"100vh"}}>
            <h3 style={{textAlign:"center",color:"snow"}} className="mb-4"> Messages</h3>
            <div className="row">
                <ul>
                    {msgList&& msgList.slice((page-1)*itemsPerPage,page*itemsPerPage).map((msg)=>
                    <li key={msg.id}>
                        <p><span>Sender Name: </span> {msg.senderName} </p>
                        <p><span>Sender Email: </span><i> {msg.senderEmail}</i> </p> 
                        <p><span>Sender Message: </span> "{msg.senderMessage}"</p>
                        <p className="msg-time">{msg.msgTimeStamp}</p>
                    </li>
                    )}
                </ul>
            </div>
            <div className="row msg-pagination">
            <Pagination count={pageCount} page={page} onChange={handleChange} />
            </div>
        </section>)
         

}
export default MessageList;