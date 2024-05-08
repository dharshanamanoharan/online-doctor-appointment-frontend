import { Link } from "react-router-dom";
const Home=()=>{
  
    return(
        <>
         <section className="home-section container-fluid px-0">
            <div className="container-fluid home-container1">
            </div>
            <div className="container-fluid home-container2 pb-5">
              <h4>Discover the online doctor appointment with <b style={{color:"#494A80"}}>DocPlus</b></h4>
            </div>
            <div className="container-fluid home-container3  py-5">
              <h3>Let’s get you a doctor who gets you! <Link to="/docplus.in/doctors-list" style={{color:"#494A80"}}> Search now!</Link></h3>
              <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1">
              <div className="card col m-3" >
                    <img src="find-a-doctor.svg" style={{transform:"Scale(1.1)"}} className="card-img-top img-fluid" alt="..."/>
                    <div className="card-body">
                    <Link to="/docplus.in/doctors-list"><h6 className="card-title"><i className="me-3 fa fa-search"></i>FIND A DOCTOR</h6></Link>
                    <p className="card-text">Browse through the doctor's list to find one. Searching with filters would further enhance the results.</p>
                    </div>
                  </div>
                  <div className="card col m-3"  >
                    <img src="view-doctor.svg" style={{transform:"Scale(0.8)"}} className="card-img-top img-fluid" alt="..."/>
                    <div className="card-body">
                    <Link to="/docplus.in/doctors-list"><h6 className="card-title"><i className="me-3 fa fa-eye"></i>VIEW PROFILE</h6></Link>
                    <p className="card-text">Choose a particular doctor and have a look on his/her detailed profile view.</p>
                    </div>
                  </div>
                  <div className="card col m-3" >
                    <img src="book-a-appointment.svg" class="card-img-top img-fluid" alt="..."/>
                    <div className="card-body">
                    <Link to="/docplus.in/doctors-list"><h6 className="card-title"><i className="me-3 fa fa-hand-pointer-o"/>BOOK A VISIT</h6></Link>
                    <p className="card-text">Pick a date and slot. Proceed with the necessary details and payment information to book an appointment.</p>
                    </div>
                  </div>
                </div>
              </div>
          </section>
        </>
    );
};
export default Home;