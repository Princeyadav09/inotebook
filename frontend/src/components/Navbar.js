import React from 'react'
import{ Link, useLocation } from "react-router-dom";
import {useNavigate} from 'react-router-dom'


const Navbar =()=>{
  let navigate = useNavigate();
    const handleLogout = () =>{
       localStorage.removeItem('token');
       localStorage.removeItem('user');
       localStorage.removeItem('name');
       localStorage.clear();
       navigate("/login");
    }

    let location = useLocation();


    return (
        <nav className="navbar navbar-expand-lg  border m-2" style={{borderRadius: "35px",backgroundColor: "#efc2b2"}}>
   <div className="container-fluid">
    <Link className="navbar-brand ms-2" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">About</Link>
        </li>
        {
          localStorage.getItem('user')==="admin"?(<li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/dashboard"? "active": ""}`} to="/dashboard">Dashboard</Link>
        </li>):null
        }
        
      </ul>

     {!localStorage.getItem('token')? <form className="d-flex">
        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
        <Link className="btn btn-primary mx-1 me-2" to="/signup" role="button">Signup</Link>
      </form>:<>
                    <div className='nav-name mx-2 '>
                        Hi,
                        <i className="fa-solid fa-user mx-2"></i>
                         {localStorage.getItem('name')}
                    </div>
               <button onClick={handleLogout} className="btn btn-primary me-2">Logout </button> </>}
    </div>
  </div>
</nav>
    )
}

export default Navbar