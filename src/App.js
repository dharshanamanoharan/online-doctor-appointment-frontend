import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import Home from './Components/Home';
import Services from './Components/Services';
import About from './Components/About';
import Contact from './Components/Contact';
import TermsandConditions from './Components/TermsandConditions';
import Faqs from './Components/Faqs';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Register from './Components/Register';
import RegistrationMessage from './Components/RegistrationMessage';
import VerificationMessage from './Components/VerificationMessage';
import Login from './Components/Login';
import ResetPassword from './Components/ResetPassword';
import DoctorList from './Components/DoctorList';
import DoctorDetail from './Components/DoctorDetail';
import AppointmentForm from './Components/AppointmentForm';
import PaymentMessage from './Components/PaymentMessage';
import UserProfile from './Components/UserProfile';
import UserActivity from './Components/UserActivity';
import Error404 from './Components/Error404';
import { isUserLoggedIn,isAdmin } from './AuthService/AuthenticationService';
import RootReducer from './Redux/RootReducer';
import {Provider } from 'react-redux';
import {createStore} from 'redux';
import UserListTable from './Dashboard/UserListTable';
import DoctorListTable from './Dashboard/DoctorListTable';
import AppointmentListTable from './Dashboard/AppointmentListTable';
import MessageList from './Dashboard/MessageList';
import AdminPanel from './Dashboard/AdminPanel';

function App() {

  //Store
  const store=createStore(RootReducer);

  //For Authentication
  const isAuth = isUserLoggedIn();
  const admin=isAdmin();
  function AuthenticatedRoute({children}){
    if(isAuth) {
      return children;
    }
    return <Navigate to="/docplus.in/error" />
  }
  function LoggedRoute({children}){
    if(!isAuth) {
      return children;
    }
    return <Navigate to="/" />
  }
  function AdminProtected({children}){
    if(isAdmin())
    {
        return children ;
    }
    else
    {
      return <Navigate to="/" />
    }
  }
  
  return (
      
      <Provider store={store}>
        <BrowserRouter>
        <Header/>
        <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docplus.in/services" element={<Services/>} />
          <Route path="/docplus.in/about" element={<About/>} />
          <Route path="/docplus.in/contact" element={<Contact />} />
          <Route path="/docplus.in/faqs" element={<Faqs/>} />
          <Route path="/docplus.in/terms" element={<TermsandConditions />} />
          <Route path="/docplus.in/register" element={<LoggedRoute><Register /></LoggedRoute>} />
          <Route path="/docplus.in/registration-message" element={<RegistrationMessage />} />
          <Route path="/docplus.in/verify-registration/:token" element={<VerificationMessage/>} />
          <Route path="/docplus.in/error" element={<Error404 />}/>
          <Route path="/docplus.in/login" element={<LoggedRoute><Login /></LoggedRoute>} />
          <Route path="/docplus.in/reset-password/:token" element={<LoggedRoute><ResetPassword /></LoggedRoute>} />
          <Route path="/docplus.in/doctors-list" element={<DoctorList />} />
          <Route path="/docplus.in/doctor-detail/doctor/:doctorId" element={<DoctorDetail />} />
          <Route path="/docplus.in/appointment-form/:doctorId" element={<AuthenticatedRoute><AppointmentForm /></AuthenticatedRoute>} />
          <Route path="/docplus.in/payment-message/:message" element={<AuthenticatedRoute><PaymentMessage /></AuthenticatedRoute>} />
          <Route path="/docplus.in/my-profile" element={<AuthenticatedRoute><UserProfile /></AuthenticatedRoute>} />
          <Route path="/docplus.in/my-activity" element={<AuthenticatedRoute><UserActivity /></AuthenticatedRoute>} />
          <Route path="/docplus.in/admin-panel" element={<AdminProtected><AdminPanel /></AdminProtected>} />
          <Route path="/docplus.in/admin-panel/users" element={<AdminProtected><UserListTable/></AdminProtected>} />
          <Route path="/docplus.in/admin-panel/doctors" element={<AdminProtected><DoctorListTable/></AdminProtected>} />
          <Route path="/docplus.in/admin-panel/appointments" element={<AdminProtected><AppointmentListTable/></AdminProtected>} />
          <Route path="/docplus.in/admin-panel/messages" element={<AdminProtected><MessageList/></AdminProtected>} />     
          </Routes>
          </div>
          <Footer />
        </BrowserRouter>
        </Provider>   
  );
}
export default App;


