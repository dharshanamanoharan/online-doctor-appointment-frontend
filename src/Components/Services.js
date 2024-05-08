
import { Link } from "react-router-dom";
const Services=()=>{
    return(
        <section className="container-fluid about-container p-3 py-5">
        <div className="p-3">
            Welcome to our innovative online platform designed to streamline the process of scheduling appointments with healthcare professionals. 
            Our user-friendly system aims to provide you with convenience, accessibility, and efficiency in managing your healthcare needs. 
            Whether you're seeking routine check-ups or specialist consultations, our platform offers a seamless solution to book appointments at your fingertips.
        </div>
        <ul className="container-fluid p-3">
            <li>
            <h6>Create an Account</h6>
            <p>
            Begin by registering on our platform. Provide basic information such as your name, contact details, and preferred login credentials to set up your account securely.
            </p>
            </li>
            <li>
            <h6>Search for Doctors</h6>  
            <p>Explore our comprehensive database of healthcare providers based on speciality, location, availability, and other filters. Find the right doctor that matches your needs and preferences.
            </p>
            </li>
            <li>
            <h6>Book Your Appointment</h6>
            <p>
            Once you've selected a healthcare provider, choose an available time slot that fits your schedule. Confirm your appointment details and receive confirmation via email.
            </p></li>
            <li>
            <h6>Manage Your Appointments</h6>
            <p>Keep track of all your scheduled appointments conveniently through your account dashboard. 
            </p>
            </li>
        </ul>
        <div className="px-3">
        Experience the convenience and efficiency of our online doctor appointment system. 
<Link to="/docplus.in/register">Sign up</Link> now to gain access to a network of trusted healthcare professionals and take control of your healthcare journey with ease.

For any inquiries or assistance, feel free to contact our dedicated support team. 
Your health and well-being are our top priorities, and we're here to support you every step of the way. 
Thank you for choosing our online doctor appointment system. We look forward to serving you!
        </div>
        </section> 
    );
};
export default Services;