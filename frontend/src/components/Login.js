import React, { useState } from 'react'

import {useNavigate} from 'react-router-dom';

const Login = () => {
   // const [credentials,setCredentials] = useState({email: "",password: ""})
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    let navigate = useNavigate();
   // console.log(credentials)

    const handleSubmit= async (e)=>{
        e.preventDefault();
        console.log(email,password)
      
        const response = await fetch("http://localhost:4000/api/auth/login", {
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
            navigate("/");

        } else {
            alert("Invalid credentials");
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
    <div>
      <form onSubmit={handleSubmit} >
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} id="email" name="email" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} name="password" id="password"/>
            </div>
            
            <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Login
