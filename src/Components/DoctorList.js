import { useState, useEffect,React } from "react";
import axios from "axios";
import { Link ,useNavigate} from "react-router-dom";
import Pagination from '@mui/material/Pagination';

const DoctorList = () => {
  const navigator=useNavigate();
  const [doctorsList, setDoctorsList] = useState([]);//For fetching data from backend
  const [filteredData, setFilteredData] = useState([]);//For storing the filtered data and displaying
  const [locationFilter,setLocationFilter]=useState();
  const [specializationFilter,setSpecializationFilter]=useState();
  const docCategory=["psychiatrist","oncologist","physiologist","opthamologist","cardiologist","neurologist","dermatologist","gynecologist","pediatrician","gastroenterologist","pathologist","nephrologist","podiatrist"];
  const docLocation=["Mumbai","Nashik","Nagpur","Pune","Thane","Solapur","Kholapur","Satara","Sangli","Panvel"]
  //API call to list the doctors from backend using axios
  const getDoctors = async () => {
    try 
    {
      const res = await axios.get("http://localhost:8080/docplus.in/doctors-list");
      setDoctorsList(res.data);
      setFilteredData(res.data);
      //console.log(res.data);
    } 
    catch (e) 
    {
      console.log(e);
    }
  };

  //To render doctor list
  useEffect(() => {
    getDoctors();
    }, []);

  //To Display filtered list by gender,specialization,location and availability status
  const [filters, setFilters] = useState(
    {
    gender: "all",
    specialization: "",
    location: "",
    availability: "",
  });

  //Handling filter values on checking and unchecking
  const handleFilterChange = (event) => {
    const { name, value, checked } = event.target;
    let filterValue;
    let specializationFilterValue=[];
    let locationFilterValue=[];

    //setting the filtervalue for gender
    if(name==="gender")
    {
      filterValue =  checked ? value : "";
      setFilters({ ...filters, [name]: filterValue });
    }
    //setting the filtervalue for specialization
    if(name==="specialization")
    {
        var a=document.getElementsByName("specialization");
        for(var i=0;i<a.length;i++)
        {
            if(a[i].checked===true)
            {
                specializationFilterValue.push(a[i].value);
            }
        }
        setFilters({...filters, [name]: specializationFilterValue });
        setSpecializationFilter(specializationFilterValue);
    }
    //setting the filtervalue for location
    if(name==="location")
    {
        var b=document.getElementsByName("location");
        for(var i=0;i<b.length;i++)
        {
            if(b[i].checked===true)
            {
                locationFilterValue.push(b[i].value);
            }
        }
        setFilters({...filters, [name]: locationFilterValue });
        setLocationFilter(locationFilterValue);
    }
    //setting the filtervalue for availability
    if(name==="availability")
    {
      filterValue =  checked ? value : "";
      setFilters({ ...filters, [name]: filterValue });
    }
  };
  console.log(filters);
 
  //Applying filter on click
  const applyFilter = () => {
    var filtered = doctorsList;

    //Filtering by gender
    if (filters.gender !== "") {
      filtered = filtered.filter((doctor) => {
        return (filters.gender !== "all"
          ? doctor.gender.toLowerCase() === filters.gender.toLowerCase()
          : doctor);
      });
    }  

    if (filters.specialization === specializationFilter) {
        var filteredDataBySpecialization=[];
        for(var i=0;i<specializationFilter.length;i++)
        {
            filteredDataBySpecialization.push(
                filtered.filter((doctor)=>{
                return(
                    doctor.specialization.toLowerCase()===specializationFilter[i].toLowerCase()
                );
            }))
        }
        //Using a dummy array to despread the  different arrays filtered by different specializations
        var dummyArray=[];
        for(var i=0;i<filteredDataBySpecialization.length;i++)
        {
            dummyArray.push(...filteredDataBySpecialization[i])
        }
        filtered=dummyArray;//Assigning the combined arrays into one single array
      }  

    
    //Filtering by location
    if (filters.location === locationFilter) {
        var filteredDataByLocation=[];
        for(var i=0;i<locationFilter.length;i++)
        {
            console.log("Inside loop",filteredDataByLocation)
            filteredDataByLocation.push(
                filtered.filter((doctor)=>{
                return(
                    doctor.location.toLowerCase()===locationFilter[i].toLowerCase()
                );
            }))
        }
        //Using a dummy array to despread the  different arrays filtered by different locations
        var dummyArray=[];
        for(var i=0;i<filteredDataByLocation.length;i++)
        {
            dummyArray.push(...filteredDataByLocation[i])
        }
        filtered=dummyArray;//Assigning the combined arrays into one single array
        //console.log("filtered data by location",filteredDataByLocation)
      }  



    //Filtering by availability
    if (filters.availability !== "") {
        filtered = filtered.filter((doctor) => {
          return (filters.availability !== "all"
          ? doctor.availability.toLowerCase() === filters.availability
          : doctor);
        });
    }
    setFilteredData(filtered);
    //console.log("filtered location array:",filteredDataByLocation);
  };
  //console.log("Final filtered Data",filteredData);

  //Clearing filter on click
  const clearFilter = () => {
    setFilters(
        { 
            gender: "all",
            specialization: "",
            location: "",
            availability: "",
        });
    var a=document.getElementsByTagName('input');
    for(var i=0;i<a.length;i++)
    {
        a[i].checked=false;
    }
    document.getElementById('doc-searchbar').value="";
    setFilteredData(doctorsList);
    };

    //Pagination
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
      setPage(value);
    };
    const pageCount=Math.ceil(doctorsList.length/6);
    const itemsPerPage=6;


    //Search Bar
    const [searchText,setSearchText]=useState("");
    function searchDoctor(val)
    {
       setFilteredData(doctorsList.filter((item)=>{
        var srch1=item.firstName.toLowerCase().includes((val).toLowerCase());
        var srch2=item.lastName.toLowerCase().includes((val).toLowerCase());
        var srch3=item.location.toLowerCase().includes((val).toLowerCase());
        var srch4=item.gender.toLowerCase().includes((val).toLowerCase());
        var srch5=item.specialization.toLowerCase().includes((val).toLowerCase());
        var srch6=item.address.toLowerCase().includes((val).toLowerCase());
        var srch7=item.availability.toLowerCase().includes((val).toLowerCase());
        var srch8=item.description.toLowerCase().includes((val).toLowerCase());
        return srch1 || srch2 || srch3 || srch4 || srch5 || srch6 || srch7 || srch8;
      }));
    }

  return (
    <>
      <section className="container-fluid doctor-list-section" style={{minHeight:"70vh"}}>
        <div className="doctor-list-container px-2 py-5">
          <div className="row">
            <div className="filter-col col-lg-3 col-md-4 col-12 mb-5">
            <div className="row searching">
              <div className="doc-search-div pb-3">
                <input onChange={(e)=>{searchDoctor(e.target.value);setSearchText(e.target.value)}} type="text" id="doc-searchbar" placeholder="search doctor" />
                <i className="fa-solid fa-magnifying-glass" onClick={()=>{searchDoctor(searchText)}}></i>
              </div>
          </div>
              <div className="d-flex filter-heading py-2"><h5>Filter your search</h5><i className=" fa-solid fa-filter"></i></div>
              
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                      Gender
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse">
                    <div className="accordion-body">
                        <div className="filter-input">
                          <input type="radio" id="male-doctor" name="gender" value="male" onChange={handleFilterChange}/>
                          <label for="male-doctor"> Male</label>
                        </div>
                        <div className="filter-input">
                          <input type="radio" id="female-doctor" name="gender" value="female" onChange={handleFilterChange}/>
                          <label for="female-doctor"> Female</label>
                        </div>
                        <div className="filter-input">
                          <input type="radio" id="all-doctor" name="gender" value="all" onChange={handleFilterChange}/>
                          <label for="all-doctor"> All</label>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingtwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsetwo">
                      Specialization
                    </button>
                  </h2>
                  <div id="collapsetwo" className="accordion-collapse collapse">
                    <div className="accordion-body">
                      {/*Doctor Category*/}
                      {(docCategory) &&   (docCategory.map((item) =>{return(           <div className="filter-input">
                        <input type="checkbox" id={item} name="specialization" value={item} onChange={handleFilterChange}/>
                        <label for={item}>{item}</label>
                      </div>);}))}
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="panelsStayOpen-headingthree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapsethree">
                      Location
                    </button>
                  </h2>
                  <div id="panelsStayOpen-collapsethree" className="accordion-collapse collapse">
                    <div className="accordion-body">
                      {/*Doctor Location*/}
                      {(docLocation) &&   (docLocation.map((item) =>{return(
                      <div className="filter-input">
                        <input type="checkbox" id={item} name="location" value={item} onChange={handleFilterChange}/>
                        <label for={item}>{item}</label>
                      </div>);}))}
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="panelsStayOpen-headingfour">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapsefour">
                      Availability
                    </button>
                  </h2>
                  <div id="panelsStayOpen-collapsefour" className="accordion-collapse collapse">
                    <div className="accordion-body">
                      <div className="filter-input">
                        <input type="radio" id="available" name="availability" value="available" onChange={handleFilterChange}/>
                        <label for="available"> Available</label>
                      </div>
                      <div className="filter-input">
                        <input type="radio" id="unavailable" name="availability" value="unavailable" onChange={handleFilterChange}/>
                        <label for="unavailable"> Unavailable</label>
                      </div>
                      <div className="filter-input">
                        <input type="radio" id="all" name="availability" value="all" onChange={handleFilterChange}/>
                        <label for="all"> All</label>
                      </div>
                      </div>
                    </div>
                  </div>
            </div>
            <div className="d-flex filter-footer py-2">
              <a className="filter my-1 mx-2" onClick={applyFilter}> Apply</a>
              <a className="filter my-1 mx-2" onClick={clearFilter}> Clear</a>
              </div>
            </div>
            <div className="col-lg-9 col-md-8 col-12">
	              <ul className="row row-cols-lg-3 row-cols-md-2 row-cols-1 p-0">
                {filteredData &&
                  filteredData.slice((page-1)*itemsPerPage,page*itemsPerPage).map((doctor) => (
      
                      <li key={doctor.id} onClick={()=>navigator(`/docplus.in/doctor-detail/doctor/${doctor.id}`)}>
                      <div className="col card mt-0">
                        <div className="card-img-top">
                          <img
                            src={doctor.image}
                            className="img-fluid"
                            alt="..."
                          />
                        </div>
                        <div className="card-body flex-column m-0">
                          <h5 className="card-title" style={{color:(doctor.availability==="available")?"black":"grey"}}>
                            Dr.{doctor.firstName} {doctor.lastName} 
                          </h5>
      
                          <p className="card-text">{doctor.specialization}</p>
                          {(doctor.availability==="unavailable")?
                          <span style={{color:"red",fontSize:"10px"}}> Currently unavailable for appointments!<br></br></span>
                          :<br></br>}

                            <Link className="view-doctordetail" to={`/docplus.in/doctor-detail/doctor/${doctor.id}`} >
                              Read more...
                            </Link> 
                        </div>
                        
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className=" container-fluid doc-pagination">
            <Pagination count={pageCount} page={page} onChange={handleChange} />
      </div>
    </>
  );
};
export default DoctorList;
