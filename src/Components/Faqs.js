const Faqs=()=>{
    return(
        <section className="container-fluid about-container p-3 py-5">
        <div className="p-3">
            <h4>Frequently Asked Questions (FAQs)</h4>
        </div>
        <ul className="container-fluid p-3">
            <li>
            <h6>How does the online appointment system work?</h6>
            <p>
            Our online appointment system allows you to search for healthcare providers based on your specific needs, such as specialty, location, and availability. Once you find a suitable provider, you can select an available time slot and book your appointment instantly.
            </p>
            </li>
            <li>
            <h6>Is it necessary to create an account to book an appointment?</h6>  
            <p>
            Yes, creating an account is required to use our online appointment system. This ensures that we can securely manage your appointment bookings and provide you with access to your appointment history and other personalized features.
            </p>
            </li>
            <li>
            <h6>Are there any fees associated with using the platform?</h6>
            <p>
            No, our online appointment system is free for patients to use. You only pay for the medical services provided by the healthcare provider for your appointment.
            </p></li>
            <li>
            <h6>Can I book appointments for family members or dependents?</h6>
            <p>
            Yes, you can manage appointments for family members or dependents through your account. Simply add their information to appointment form and book appointments on their behalf.
            </p>
            </li>
            <li>
            <h6>How far in advance can I book appointments?</h6>
            <p>
             Appointment booking windows may vary depending on the healthcare provider's availability. Generally, you can book appointments anywhere from a few days to several weeks in advance.
            </p>
            </li>
            <li>
            <h6>What if I need to reschedule or cancel my appointment?</h6>
            <p>
            Currently we don't provide this feature of cancellation.
            </p>
            </li>
            <li>
            <h6>How do I receive reminders for my upcoming appointments?</h6>
            <p>
            You will receive an email on booking. This will include important details such as the date and time of your appointment.
            </p>
            </li>
            <li>
            <h6>What if I encounter technical issues or require assistance with booking appointments?</h6>
            <p>
            If you encounter any technical issues or require assistance with using our platform, please reach out to our dedicated support team for prompt assistance. We're here to help you.
            </p>
            </li>

        </ul>
       
        </section> 

    );
}
export default Faqs;