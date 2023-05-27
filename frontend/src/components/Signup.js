import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'



const Signup = () => {

  const [credentials,setCredentials] = useState({name:"",email: "",password: "",cpassword: ""})
  let navigate = useNavigate();

  const handleSubmit= async (e)=>{
    e.preventDefault();
    
    const {name,email,password} = credentials;
  
    const response = await fetch("http://localhost:4000/api/auth/createuser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({name,email,password})
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
  }

  const onChange = (e) =>{
    setCredentials({...credentials,[e.target.name]: e.target.value})
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
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
     
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Signup
