import React from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { getLoggedInUser, isAdmin, isUserLoggedIn, logout } from "../AuthService/AuthenticationService";
import axios from "axios";
import { useState } from "react";
const Header=()=>{
    const location=useLocation();
    const navigator=useNavigate();
    const isAuth=isUserLoggedIn();
    const admin=isAdmin();
    const userNameOrEmail=getLoggedInUser();
    const [userAvatar,setUserAvatar]=useState("../user-avatar.png");
    console.log("loggedin user",userNameOrEmail);
   const gettingLogged=async()=>{ 
    try{
        const res=await axios.post("http://localhost:8080/docplus.in/user?userNameOrEmail="+userNameOrEmail);
        //console.log(res.data.user_avatar);
        setUserAvatar(res.data.user_avatar);
    }
    catch(error)
    {
        console.log(error);
    }
}
    gettingLogged();
    const role=localStorage.getItem("role");
    console.log("auth",role)
    console.log("isAdmin in Header",admin);
    //console.log("Is logged in?",isAuth);
    const handleLogout=()=>{
        window.location.reload(true);
        logout();
        navigator("/");
    }
    return (
      <>
        {/*--Top Navigation Bar*/}
        <nav className=" container-fluid px-5 py-2 navbar navbar-expand-lg sticky-top doc-app-navbar p-3" id="doc-top-nav" style={{backgroundColor:(((location.pathname).includes("/docplus.in/admin-panel"))?"black":"#494a80")}}>
            <div className="container-fluid">
                <a className="navbar-brand"><Link to="/"><img src={"../docpluslogo.png"} className="img-fluid" style={{height:"40px",width:"40px"}}/>DocPlus</Link></a>
            <button style={{backgroundColor:((location.pathname).includes("/docplus.in/admin-panel"))?"black":"#494a80",color:((location.pathname).includes("/docplus.in/admin-panel"))?"white":"white"}} className="btn btn-primary doc-app-side-navbar-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i className="fa-solid fa-bars"></i></button>
                <div className="collapse navbar-collapse nav-menu">
                    <ul className="navbar-nav">
                       {(!admin)? 
                       <>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page"><Link to="/">Home</Link></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"><Link to="/docplus.in/about">About</Link></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"><Link to="/docplus.in/services">Services</Link></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" ><Link to="/docplus.in/contact">Contact</Link></a>
                        </li>
                        </>
                        :<>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page"><Link to="/docplus.in/admin-panel"><i class="me-1 fa-solid fa-chart-line"/>Dashboard</Link></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"><Link to="/docplus.in/admin-panel/users"><i class="me-1 fa-regular fa-user"/>Users</Link></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"><Link to="/docplus.in/admin-panel/doctors"><i class="me-1 fa-solid fa-doctor"/>Doctors</Link></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"><Link to="/docplus.in/admin-panel/appointments"><i class="me-1 fa-regular fa-calendar-check"/>Appointments</Link></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"><Link to="/docplus.in/admin-panel/messages"><i class="me-1 fa-regular fa-envelope"/>Messages</Link></a>
                        </li>
                        </>}
                    </ul>
                    {(!isAuth)&&
                    <div className="d-flex flex-row">
                    <div className="mx-2 nav-login"><a href="#" ><Link to="/docplus.in/login"><i className="fa-solid fa-user"></i>Sign In</Link></a></div>
                    <div className="mx-2 nav-login"><a href="#"><Link to="/docplus.in/register"><i className="fa-solid fa-user-plus"></i>Sign Up</Link></a></div>
                    </div>
                    }
                    {isAuth&&
                    <>
                    <div className="dropdown">
                        <div className="user-avatar dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img className="user-avatar d-flex flex-row" src={userAvatar} alt="avatar" />
                        </div>
                        <ul class="dropdown-menu">
                            <li><Link className="dropdown-item" style={{color:((location.pathname).includes("/docplus.in/admin-panel"))?"black":"#494a80"}} to="/docplus.in/my-profile"><i class="fa-regular fa-address-card"></i>My Profile</Link></li>
                            {(!admin)&&<li><Link className="dropdown-item" to="/docplus.in/my-activity"><i class="fa-solid fa-chart-line"></i>My Activity</Link></li>}
                            {(admin)&&
                            <li><Link className="dropdown-item" style={{color:((location.pathname).includes("/docplus.in/admin-panel"))?"black":"#494a80"}} to="/docplus.in/admin-panel"><i class="fa-solid fa-user-tie"></i>Admin Panel</Link></li>
                            }
                            <li><Link className="dropdown-item" style={{color:((location.pathname).includes("/docplus.in/admin-panel"))?"black":"#494a80"}} to="/" onClick={handleLogout}><i className="fa-solid fa-user" ></i>Sign Out</Link></li>
                           
                        </ul>
                    </div>
                    </>
                    }
                </div>
            </div>
        </nav>
        {/*Left OffCanvas Navbar*/}
        <div className="offcanvas offcanvas-start  doc-app-side-navbar"   tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" >
        <div className="offcanvas-header p-2 ps-4" style={{backgroundColor:((location.pathname).includes("/docplus.in/admin-panel"))?"black":"#494a80"}}>
        <a className="navbar-brand"><Link to="/"><img src={"../docpluslogo.png"} className="img-fluid" style={{height:"60px",width:"60px"}}/>DocPlus</Link></a>
        </div>
        <div className="offcanvas-body">
            <ul className="navbar-nav">
            {(!admin)? 
                       <>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page"><Link to="/">Home</Link></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"><Link to="/docplus.in/about">About</Link></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"><Link to="/docplus.in/services">Services</Link></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" ><Link to="/docplus.in/contact">Contact</Link></a>
                        </li>
                        </>
                        :<>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page"><Link to="/docplus.in/admin-panel"><i class="me-1 fa-solid fa-chart-line"/>Dashboard</Link></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"><Link to="/docplus.in/admin-panel/users"><i class="me-1 fa-regular fa-user"/>Users</Link></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"><Link to="/docplus.in/admin-panel/doctors"><i class="me-1 fa-solid fa-doctor"/>Doctors</Link></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"><Link to="/docplus.in/admin-panel/appointments"><i class="me-1 fa-regular fa-calendar-check"/>Appointments</Link></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"><Link to="/docplus.in/admin-panel/messages"><i class="me-1 fa-regular fa-envelope"/>Messages</Link></a>
                        </li>
                        </>}
                {(!isAuth)&&<>
                <li className="nav-item">
                <a  className="nav-link"><Link to="/docplus.in/login"><i className="fa-solid fa-user"></i>Sign In</Link></a>
                </li>
                <li className="nav-item">
                <a  className="nav-link"><Link to="/docplus.in/register"><i className="fa-solid fa-user-plus"></i>Sign Up</Link></a>
                </li></>}
                {isAuth&&
                    <>
                    <div className="mx-4 dropdown">
                        <div className="user-avatar dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img className="user-avatar d-flex flex-row" src={userAvatar} />
                        </div>
                        <ul class="dropdown-menu">
                            <li><Link style={{color:((location.pathname).includes("/docplus.in/admin-panel"))?"black":"#494a80"}} className="dropdown-item" to="/docplus.in/my-profile"><i class="fa-regular fa-address-card"></i>My Profile</Link></li>
                            {(!admin)&&<li><Link className="dropdown-item" to="/docplus.in/my-activity"><i class="fa-solid fa-chart-line"></i>My Activity</Link></li>}
                            {(isAuth&&admin)&&
                            <li><Link style={{color:((location.pathname).includes("/docplus.in/admin-panel"))?"black":"#494a80"}} className="dropdown-item" to="/docplus.in/admin-panel"><i class="fa-solid fa-user-tie"></i>Admin Panel</Link></li>
                            }
                            <li><Link style={{color:((location.pathname).includes("/docplus.in/admin-panel"))?"black":"#494a80"}} className="dropdown-item" to="/" onClick={handleLogout}><i className="fa-solid fa-user" ></i>Sign Out</Link></li>
                        </ul>
                    </div>
                    </>
                    }
            </ul>
        </div>
        </div>
      </>
    );
};
export default Header;