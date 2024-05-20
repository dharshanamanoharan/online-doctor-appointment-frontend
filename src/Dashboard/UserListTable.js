import React, {  useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { CurrentUser } from '../Redux/Actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import Register from '../Components/Register';
import { funShowPassword } from '../AuthService/ShowPassword';
const UserListTable=()=>{
    const dispatch=useDispatch();
    const user=useSelector((state)=>state.user)
    //console.log("user from reducer",user);

    //Getting User List
    const [userData,setUserData]=useState([]);

    const getAllUsers=async()=>{
       try
       {
           const res=await axios.get("http://localhost:8080/docplus.in/users-list");
           setUserData(res.data);
           //console.log(res.data);
       }
       catch(error)
       {
           console.log(error);
       }
    }
    useEffect(()=>{getAllUsers();},[funDeleteUser,funEditUser]);
    
     //Editing the user
     const [firstName,setFirstName]=useState(user[0].firstName);
     const [lastName,setLastName]=useState(user[0].lastName);
     const [userName,setUserName]=useState(user[0].userName);
     const [email,setEmail]=useState(user[0].email);
     const [password,setPassword]=useState("");
     const [user_avatar,setUserAvatar]=useState(user[0].user_avatar);
     const [roles,setRoles]=useState(user[0].roles);
     useEffect(()=>{
        setFirstName(user[0].firstName);
        setLastName(user[0].lastName);
        setUserName(user[0].userName);
        setEmail(user[0].email);
        setUserAvatar(user[0].user_avatar);
        setRoles(user[0].roles);
     },[user])
     //console.log("F",userName)
     
    //To display error on validation
        const [err1,setErr1]=useState("");
        const [err2,setErr2]=useState("");
        const [err3,setErr3]=useState("");
        const [err4,setErr4]=useState("");
        const [err5,setErr5]=useState("");
        const [err6,setErr6]=useState("");
        const [err7,setErr7]=useState("");
        const [updateMessage,setUpdateMessage]=useState("");
    //RegeEx for validation
        const emailRegEx=new RegExp(/^[a-zA-Z0-9.]+@[a-zA-Z]+.[A-Za-z]{2,}$/);
        const nameRegEx=new RegExp(/^[a-zA-Z]*$/);
        const userNameRegEx=new RegExp(/^[a-zA-Z0-9]*$/);
        const pwRegEx1=new RegExp(/[a-z]/);
        const pwRegEx2=new RegExp(/[A-Z]/);
        const pwRegEx3=new RegExp(/[0-9]/);
        const pwRegEx4=new RegExp(/[^\w]/);
        var fl1,fl2,fl3,fl4,fl5,fl6,fl7;
        function funpasswordvalidate()
        {
            (password.trim()===""||password.length<8||!pwRegEx1.test(password)||!pwRegEx2.test(password)||!pwRegEx3.test(password)||!pwRegEx4.test(password))?setErr5("Password must be atleast 8 characters with 1 uppercase,1 lowercase,1 number and 1 symbol"):fl5=true
        }
    //Clearing Values on Closing
    function editClear()
    {
        setUpdateMessage("");setErr1("");setErr2("");setErr3("");
        setErr4("");setErr5("");setErr6("");setErr7("");
        document.getElementById("floatingInput1").value="";
        document.getElementById("floatingInput2").value="";
        document.getElementById("floatingInput3").value="";
        document.getElementById("floatingInput4").value="";
        document.getElementById("floatingInput5").value="";
        document.getElementById("floatingInput6").value="";
        document.getElementById("floatingPassword").value="";
    }
    //Edit Roles
    function editRoles(e)
    {
        var sel=document.getElementById("floatingInput5");
        var selArr=[];
        //console.log("len",sel.options.length)
        for(var i=0;i<sel.options.length;i++)
        {
            if(sel.options[i].selected===true)
            { 
                selArr.push(sel.options[i].value);
               // alert(sel.options[i].value)
            }
        }
        setRoles(selArr);
        //alert(selArr)
    }
     async function funEditUser(id)
     {
        
        setErr1("");setErr2("");setErr3("");setErr4("");
        setErr5("");setErr6("");setErr7("");setUpdateMessage("");
        //Ternary
            (firstName.trim()==="" || firstName.length<3 || !nameRegEx.test(firstName) )?setErr1("Name must be atleast 3 alphabets & atmost 15 alphabets"):fl1=true;
            (lastName.trim()==="" || lastName.length<3 || !nameRegEx.test(lastName))?setErr2("Name must be atleast 3 alphabets & atmost 15 alphabets"):fl2=true;
            (userName.trim()===""|| userName.length<3 ||!userNameRegEx.test(userName))?setErr3("Name must be atleast 3 & atmost 15 alphanumeric characters"):fl3=true;
            (email.trim()==="" || !emailRegEx.test(email))?setErr4("Please enter valid email address!"):fl4=true;
            (user_avatar===null )?setErr6("Please upload a picture"):fl6=true;
            (roles===null )?setErr7("Please enter role!"):fl7=true;
            (password==="")?fl5=true:funpasswordvalidate();
            if(fl1===true && fl2===true && fl3===true && fl4===true && (fl5===true) && fl6===true && fl7===true)
            {
                try
                {   
                    const res=await axios.put("http://localhost:8080/docplus.in/user/"+id,
                    {
                        firstName,
                        lastName,
                        userName,
                        email,
                        roles,
                        password,
                        user_avatar
                    });
                    setErr1("");setErr2("");setErr3("");setErr4("");
                    setErr5("");setErr6("");setErr7("");
                    setUpdateMessage("Updated Successfully!");
                    //console.log(res.data); 
                }
                catch(error)
                {
                    console.log(error)
                    setUpdateMessage("Update Failed!");
                }
            }
        
     }

    
    //Deleting the user
    const [delMsg,setDelMsg]=useState("");
    async function funDeleteUser(id)
    {
        try{   
            const res=await axios.delete("http://localhost:8080/docplus.in/user/"+id);
            //console.log(res.data); 
            setDelMsg("Deleted Successfully!");
        }
        catch(error)
        {
            console.log(error)
            if(error.message==="Request failed with status code 404")
            {
                setDelMsg("User has been deleted already!");
            }
            else
            {
                setDelMsg("Delete Failed!");
            }
        }
    }
   
    //Creating rows of the table
    const rows=[];
    
    for(var i=0;i<userData.length;i++)
    {
        var activated=userData[i].enabled?"true":"false";
        rows[i]=createData(
            userData[i].id,
            userData[i].firstName,
            userData[i].lastName,
            userData[i].userName,
            userData[i].email,
            userData[i].role,
            activated)
    }
    //console.log("rows:",rows);
      
    //Creating columns of the table
    const columns = [
        {label: 'UserID',id:"userID"},
        {label: 'Name',id:"Name"},
       /* {label: 'Last_Name',id:"lastName"},*/
        {label: 'UserName',id:"userName"},
        {label: 'EmailID',id:"email"},
        {label: 'Role',id:"role"},
        {label: 'Verified',id:"enabled"},
    ];
    

    function createData(userID,Name,userName,email,role,enabled) {
        return { userID,Name,userName,email,role,enabled};
    }
     
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => 
    {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return(
        <section className='container-fluid p-5' style={{backgroundColor:"#1a1a1a",color:"snow",height:"100vh"}}>
              <h5 style={{textAlign:"center"}} className='mb-4'> USERS LIST</h5>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                   <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns && columns.map((column) => (
                            <TableCell key={column.id} style={{backgroundColor:"black",color:"snow"}}>
                            {column.label}
                            </TableCell>
                        ))}
                        <TableCell style={{backgroundColor:"black",color:"snow"}}>View</TableCell>
                        <TableCell style={{backgroundColor:"black",color:"snow"}}>Edit</TableCell>
                        <TableCell style={{backgroundColor:"black",color:"snow"}}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row,i) => {var userId;
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns && columns.map((column) => {
                                const value = row[column.id];
                                userId=row["userID"];
                                return (<>
                                    <TableCell key={column.id} style={{backgroundColor:((i)%2===0)?"rgb(41, 39, 39)":"rgb(41, 39, 39)",color:"snow"}}>
                                    {column.format && (typeof value === 'number')
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                    </>
                                  );}
                                )} 
                                <TableCell style={{backgroundColor:((i)%2===0)?"rgb(41, 39, 39)":"rgb(41, 39, 39)",color:"snow"}}>
                                    <button className="view-user" onClick={()=>{(dispatch(CurrentUser(userData,userId)));}}  data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
                                        <i className="fa-solid fa-eye"></i>
                                    </button>
                                </TableCell>
                                <TableCell style={{backgroundColor:((i)%2===0)?"rgb(41, 39, 39)":"rgb(41, 39, 39)",color:"snow"}}>
                                    <button className="edit-user" onClick={()=>{(dispatch(CurrentUser(userData,userId)));}} data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </button>
                                </TableCell>
                                <TableCell style={{backgroundColor:((i)%2===0)?"rgb(41, 39, 39)":"rgb(41, 39, 39)",color:"snow"}}>
                                    <button className="delete-user" onClick={()=>{(dispatch(CurrentUser(userData,userId)));}} data-bs-toggle="modal" data-bs-target="#staticBackdrop3">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </TableCell>
                            </TableRow>
                       );})}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{color:"snow",backgroundColor:"black"}}
                />
               </Paper>
               <div className="row add-user">
                    <a style={{color:"snow",fontSize:"13px",padding:"5px"}} data-bs-toggle="modal" data-bs-target="#staticBackdrop4">Add User</a>
               </div>
             <section className="admin-panel-users">
               {/*Modal1-View User*/}
                  <div className="modal" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog ">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">User</h1>
                            <a className="col-1"  data-bs-dismiss="modal"><i className="fa-solid fa-x"></i></a>
                        </div>
                        <div className="modal-body view-profile">
                            <div className=" card pb-2" >
                                    <img src={"http://localhost:3000/"+(user[0].user_avatar)} className="card-img-top img-fluid" />
                                    <div className="card-body">
                                        <p><span>User ID : </span>{user[0].id}</p>
                                        <p><span>First Name : </span>{user[0].firstName}</p>
                                        <p><span>Last Name : </span>{user[0].lastName}</p>
                                        <p><span>Email ID : </span>{user[0].email}</p>
                                        <p><span>User Name : </span>{user[0].userName}</p>
                                        <p><span>Role : </span>{user[0].role.toString()}</p>
                                        <p><span>Activated Status : </span>{user[0].enabled?"true":"false"}</p>
                                    </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>


                    {/*Modal2-Edit User*/}
                    <div className="modal fade edit-user-section" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit User Details</h1>
                            <a className="col-1"  data-bs-dismiss="modal" onClick={()=>{editClear();}}><i className="fa-solid fa-x"></i></a>
                        </div>
                        <div className="modal-body d-flex flex-column py-5">
                            <div className="row">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floatingInput1" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                                    <label for="floatingInput1">FirstName</label>
                                </div>
                            </div>
                            <p className="app-err row">{err1}</p>
                            <div className="row">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floatingInput2" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
                                    <label for="floatingInput2">LastName</label>
                                </div>
                            </div>
                            <p className="row app-err">{err2}</p>
                            <div className="row">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floatingInput3" value={userName}  onChange={(e)=>setUserName(e.target.value)}/>
                                    <label for="floatingInput3">UserName</label>
                                </div>
                            </div>
                            <p className="row app-err">{err3}</p>
                            <div className="row">
                                <div className="form-floating">
                                    <input type="email" className="form-control" id="floatingInput4" value={email} onChange={(e)=>setEmail(e.target.value)} />
                                    <label for="floatingInput4">Email</label>
                                </div>
                            </div>
                            <p className="row app-err">{err4}</p>
                            <div className="row">
                                <div className="form-floating p-1 col-12 d-flex flex-row">
                                    <input type="password" className="form-control" id="floatingPassword" onChange={(e)=>{setPassword(e.target.value);}}/>
                                    <label for="floatingPassword">Password</label>
                                    <div className="visible-icon" onClick={funShowPassword} >
                                        <i id="show-pwd" className="fa-solid fa-eye-slash"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="row app-err">{err5}</p>
                            <div className='row'>
                                <div className="form-floating">
                                    <input type="file" className="form-control" id="floatingInput6" onChange={(e)=>{var a=(e.target.value);setUserAvatar(a.replace("C:\\fakepath\\", "../"));}} />
                                    <label for="floatingInput6">User Avatar</label>
                                </div>
                            </div>
                            <p className="row app-err">{err6}</p>
                            <div className='row'>
                                <div className="form-floating">
                                    <select className="form-control" id="floatingInput5" value={roles} multiple="true" onChange={(e)=>editRoles(e)}>
                                        <option value="ROLE_USER">User</option>
                                        <option value="ROLE_ADMIN">Admin</option>
                                    </select>
                                    <label for="floatingInput5">Role</label>
                                </div>
                            </div>
                            <p className="row app-err">{err7}</p>
                            <div className='row update-div'>
                                <a className="update-user" onClick={()=>funEditUser(user[0].id)}>Update</a>
                            </div>
                            <p className="mt-3 row app-err" style={{color:(updateMessage.includes("Updated Successfully!"))?"green":"red"}}>{updateMessage}</p>
                        </div>
                        </div>
                    </div>
                    </div>


                    {/*Modal3-Delete User*/}
                    <div className="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Delete User</h1>
                            <a className="col-1"  data-bs-dismiss="modal" onClick={()=>setDelMsg("")}><i className="fa-solid fa-x"></i></a>
                        </div>
                        <div className="modal-body py-5 d-flex flex-column">
                            <h6>Are you sure you want to delete this user?</h6>
                            <div className='d-flex flex-row mt-3'>
                                <a className='del-user me-5' onClick={()=>{funDeleteUser(user[0].id)}}>Yes</a>
                                <a className='del-user' data-bs-dismiss="modal" onClick={()=>setDelMsg("")}>No</a>
                            </div>
                            <p className="app-err mt-4" style={{fontSize:"13px",color:(delMsg.includes("Deleted Successfully!"))?"green":"red"}}>{delMsg}</p>
                        </div>
                        </div>
                    </div>
                    </div>


                    
                    {/*Modal4-Add new User*/}
                    <div className="modal fade" id="staticBackdrop4" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Add User</h1>
                                <a className="col-1"  data-bs-dismiss="modal"><i className="fa-solid fa-x"></i></a>
                            </div>
                            <div className="modal-body d-flex flex-column">
                                <Register />
                            </div>
                        </div>
                    </div>
                    </div>
                    </section>
        </section>
    );
}
export default UserListTable;