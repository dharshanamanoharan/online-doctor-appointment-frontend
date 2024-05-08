import { useParams } from "react-router-dom";
import { useEffect } from "react";
const PaymentMessage=()=>{
    const message=useParams();
    //Prevent from going back in browser tab
    useEffect(() => {
      window.history.pushState(null, document.title, "/docplus.in/error");
        window.addEventListener('popstate', function(event) {
        window.history.pushState(null, document.title,  "/docplus.in/error");
        });
      }, []);
    return(
        <section style={{minHeight:"70vh"}}>
        {(message.message==="success")?
        (<div className="my-5 container-fluid payment-message-success" ></div>):
        (<div className="my-5 container-fluid payment-message-failure" ></div>)}
        </section>
    )
}
export default PaymentMessage;