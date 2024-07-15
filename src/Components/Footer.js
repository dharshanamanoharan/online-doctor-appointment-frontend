import { useState } from "react";
import { Link,useLocation } from "react-router-dom";
import { isUserLoggedIn,isAdmin } from "../AuthService/AuthenticationService";
const Footer = () => {
  const location=useLocation();
  const isAuth=isUserLoggedIn();
  const admin=isAdmin();
  //Fixed Scroll Up Arrow 
  const [visible,setVisible]=useState(false);
  const toggleVisible = () => { 
    const scrolled = document.documentElement.scrollTop; 
    (scrolled > 300)?setVisible(true):setVisible(false) 
  }; 

  //Scrolling to top using window
  const scrollToTop = () =>{ 
    window.scrollTo({ top: 0,  behavior: 'smooth'});
    //Smooth behaviour is mentioned to ensure smooth transition
  }; 

  //Tracking scroll event and calling the toggle visible function to display accordingly
  window.addEventListener('scroll', toggleVisible); 

  //Facts Display
 
  var quotes=[
  
  {
    image:"../fact8.gif",
    quote:"Sleep impacts your growth, hormone levels, immunity, cardiovascular health, blood pressure, appetite, and breathing.Sleep affects almost every tissue in the body."
  },
  {
    image:"../fact5.svg",
    quote:"Moderate exercise may increase the amount of deep sleep you get.Getting some exercise earlier in the day may improve your sleep."
  },
  {
    image:"../fact7.svg",
    quote:"Adequate sleep reduces risk of many diseases."
  },
  {
    image:"../fact1.svg",
    quote:"Laughter causes more oxygen consumption.The process of laughing increases your respiratory rate. The increased oxygen consumption causes you to enter a state of relaxation for a period of time."
  },
  {
    image:"../fact2.jpg",
    quote:"The sun is part of your nutrition.Getting sunshine exposure is essential to making vitamin D.So soaking in some rays is actually part of a healthy diet."
  },
  {
    image:"../fact4.svg",
    quote:"Diet is highly personal.What’s a healthy diet for one person may not work well for the next.For that reason, working with a doctor or nutritionist when making dietary changes is important."
  },
  {
    image:"../fact9.jpg",
    quote:"You may already know that stress can increase your heart disease risk, but it also increases your risk of developing type 2 diabetes due to cortisol level increases. Cortisol increases blood sugar levels."
  },
  {
    image:"../fact6.svg",
    quote:"Exercising when you're young can keep bones stronger when you're old. Being physically active as a child, teen and young adult can fortify your bones, making them stronger throughout your life."
  }
    
  ]
  const [quote,setQuote]=useState(quotes[Math.ceil(Math.random()*7)].quote);
  const [image,setImage]=useState(quotes[Math.ceil(Math.random()*7)].image);
  function funFact()
  {
    var i=Math.ceil(Math.random()*7);
    setQuote(quotes[i].quote);
    setImage(quotes[i].image);
  }
 setInterval(setTimeout(funFact,10000),10000);
 
  return (
    <>
      {/*Footer Section */}
      <section className="container-fluid doc-app-footer mb-0" style={{backgroundColor:((location.pathname).includes("/docplus.in/admin-panel"))?"black":"#494a80"}} >
          <div className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-1 m-0">
            <div className="col mb-2">
               <Link className="footer-brand" to="/"><div className=" mb-3 row d-flex align-items-center justify-content-start">
                  <img src={"../docpluslogo.png"} className="m-0 col-1 img-fluid" />
                  <h5 className="col-5 mb-0 ps-0">DocPlus</h5>
                </div></Link> 
            </div>
            <div className="col mb-2">
              <ul>
                <li><Link to="/docplus.in/about">About Us</Link></li>
                <li><Link to="/docplus.in/services">Services</Link></li>
                <li><Link to="/docplus.in/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="col mb-2">
              <ul>
                <li><Link to="/docplus.in/faqs">FAQs</Link></li>
                <li><Link to="/docplus.in/terms">Terms & Conditions</Link></li>
              </ul>
            </div>
            <div className="col contact-col mb-2">
              <ul>
                <li><i class="fa-solid fa-phone fa-bounce"></i><p>+912380933400</p></li>
                <li><i class="fa-regular fa-envelope"></i><p>admin@docplus.in</p></li>
              </ul>
            </div>
            <div className="col mb-2">
             {(isAuth)&&<>
              <ul>
              {(!admin)&& <><li><Link to="/docplus.in/my-profile">Profile</Link></li>
                <li><Link to="/docplus.in/my-activity">Activity</Link></li></>}
              </ul></>}
            </div>
          </div>
          {/*Fixed Arrow*/}
            <div className="fixed_arrow" onClick={scrollToTop} style={{display: visible ? 'flex' : 'none',backgroundColor:((location.pathname).includes("/docplus.in/admin-panel"))?"black":"#494a80",color:((location.pathname).includes("/docplus.in/admin-panel"))?"white":"white"}}>
              <ion-icon name="arrow-up-outline"></ion-icon>
            </div>
             {/*Fixed Facts Icon*/}
             <div className="fixed-facts-icon"  style={{display:((location.pathname).includes("/docplus.in/admin-panel"))?"none":"flex"}} data-bs-toggle="modal" data-bs-target="#staticBackdropfact" >
              <img src={"../bulb.png"} className="img-fluid"/>
            </div>
            {/* Facts Modal*/}
         <section className="fact-container">
        <div className="modal fade" id="staticBackdropfact" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header py-0">
                <h1 className="modal-title fs-5" id="staticBackdropLabel"> <img src={"../bulb.png"} className="img-fluid"/>Health Facts</h1>
                <a className="col-1"  data-bs-dismiss="modal"><i className="fa-solid fa-x"></i></a>
              </div>
              <div className="modal-body">
                  <div className="fact-box pt-5">
                    <img src={image} className="img-fluid me-0"/>
                    <div className="fact-txt p-5">"{quote}"</div>
                  </div>
              </div>
              <div className="modal-footer pb-2">
                <button className="close-fact mb-3"  data-bs-dismiss="modal">Close</button>
                <span>Different facts will be displayed every 10 seconds!</span>
              </div>
            </div>
          </div>
        </div>
        </section>
      </section>
    </>
  );
};
export default Footer;
