import React, { useState } from 'react'
import inotebook from "../Assets/inotebook.png"

import {useNavigate} from 'react-router-dom';

const Login = (props) => {
   // const [credentials,setCredentials] = useState({email: "",password: ""})
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    let navigate = useNavigate();
   // console.log(credentials)

    const handleSubmit= async (e)=>{
        e.preventDefault();
        console.log(email,password)
      
        const response = await fetch("https://inotebook-backend-xi5u.onrender.com/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({email,password})
        });

        const json = await response.json();
        console.log(json);
        if(json.success){
            // save the auth token and redirect
            localStorage.setItem('token' , json.authtoken);
            localStorage.setItem('user' , json.userType);
            localStorage.setItem('name' , json.name);
            props.showAlert("Logged in successfully", "success")
            if(json.userType==="admin"){
                navigate("/dashboard")
            } else { 
                navigate("/");
            }
        } else {
            props.showAlert("Invalid Credentials", "danger")
        }
        
            

    //     const response = await axios.post("http://localhost:4000/api/auth/login",{
    //         email,password
    //     },{"headers":{
    //         "Content-Type": 'application/json'
    //     }})
    //    // console.log(response.data.success)
    //     const json = await response.json();
       
    //     if(!json){
    //         alert("Invalid credentials");
           
    //     } else {
    //          // redirect
    //     }
    }

    // const onChange = (e) =>{
    //     setCredentials({...credentials,[e.target.name]: e.target.value})
    // }

    

  return (
    <div className="container mt-3">
        <div className="row ">
            <div className="col-md-8 mt-5 border-end border-primary ">
                   {/* <h1 className=''>Welcome to Inotebok</h1> */}
                   <img src={inotebook} alt="" class="img-fluid" />
            </div>
            <div className="col-md-4 mt-5  ">
            <div className="container mt-5  rounded py-3" style={{width: "fit-content",backgroundColor:"#efc2b2"}}>
                    <center><h2>Login</h2></center>
                <form onSubmit={handleSubmit} >
                        <div className=" mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control " value={email} onChange={e=>setEmail(e.target.value)} id="email" name="email" aria-describedby="emailHelp"/>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control " value={password} onChange={e=>setPassword(e.target.value)} name="password" id="password"/>
                        </div>
                        
                        <button type="submit" className="btn btn-primary form-control my-2" >Login</button>
                </form>
                </div>
            </div>
    
   
    </div>
    </div>
  )
}

export default Login
