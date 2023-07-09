import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import inotebook from "../Assets/inotebook.png"



const Signup = (props) => {

  const [credentials,setCredentials] = useState({name:"",email: "",password: "",cpassword: ""})
  const [userType,setUsertype] = useState("user")
  const [secretkey,setSecretkey] = useState("")
  let navigate = useNavigate();

  const handleSubmit= async (e)=>{
    e.preventDefault();

    if(userType==="admin"){
      if(secretkey!=="prince_yadav"){
        props.showAlert("Invalid Secret key", "danger")
        return;
      }
    }
    
    const {name,email,password} = credentials;
  
    const response = await fetch("https://inotebook-backend-xi5u.onrender.com/api/auth/createuser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({name,email,password,userType})
    });

    const json = await response.json();

    console.log(json);
    if(json.success){
        // save the auth token and redirect
        localStorage.setItem('token' , json.authtoken);
        localStorage.setItem('user',userType);
        localStorage.setItem('name',name);
        if(userType==="user"){
          navigate("/");
        } else {
          navigate("/dashboard");
        }
        props.showAlert("Acount Created Successfully", "success")

    } else {
       props.showAlert("Invalid Details", "danger")
    }
  }

  const onChange = (e) =>{
    setCredentials({...credentials,[e.target.name]: e.target.value})
  }

  const handleChange = (e) => {
      if(userType==="user"){
        setUsertype("admin");
      } else {
        setUsertype("user");
      }
  }


  return (
    <div className="container mt-5">
        <div className="row ">
            <div className="col-md-8 mt-5 border-end border-primary ">
                  {/* <h1 className=''>Welcome to Inotebok</h1> */}
                  <img src={inotebook} alt="" />
            </div>
            <div className="col-md-4 mt-5  ">
            <div className="container my-2  rounded py-3" style={{width: "fit-content",backgroundColor:"#efc2b2"}}>

               <center> <h2 className="my-3">SignUp</h2></center>
                <form onSubmit={handleSubmit}>

                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" onChange={handleChange} value="" id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      Sighnup as an Admin
                    </label>
                  </div>

                  {userType==="admin"?(<div className="my-3">
                    <label htmlFor="name" className="form-label">Secret key</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={(e)=>{setSecretkey(e.target.value)}} aria-describedby="emailHelp"/>      
                  </div>):null} 

                  <div className="my-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
                  
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="Password" name="password" onChange={onChange} minLength={5} required/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cPassword" name="cpassword" onChange={onChange}minLength={5} required/>
                  </div>
                
                  <button type="submit" className="btn btn-primary form-control my-2">Submit</button>
                </form>


            </div>
            </div>


    </div>
    </div>
  )
}

export default Signup
