import React, { useState } from 'react'
import Users from './Users'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const [url,seturl] = useState(`https://inotebook-backend-xi5u.onrender.com/api/auth/getusers/?searchText=${""}&`)
    
   
    const handleSubmit = (e) => {
    
          seturl(`https://inotebook-backend-xi5u.onrender.com/api/auth/getusers/?searchText=${e.target.value}&`)
        
    }
    

  return (
    <div className="container">
        <center><h2>Admin Dashboard</h2></center>
       <div className="row mt-5">
            <div className="container col-sm-4 border-start border-dark px-0">
                <nav class="navbar navbar-expand-lg navbar-light bg-light ">
                 <h2 className='mx-2'>Filter</h2>
                </nav>
                <div className="row m-3">
                    <ul>
                        <li>
                           <Link to='#' onClick={(e)=>{seturl(url+"sortbynotes=notes&")}}>Acoording to notes</Link> 
                        </li>
                    </ul>
                </div>
                {/* <div className="row">
                    <div className="col"><intput type='text' onClick={(e)=>{seturl(url+"maxNotes=notes&")}}>Notes greater than</intput></div>
                </div>
                <div className="row">
                    <div className="col">Acoording to notes</div>
                </div> */}
            </div>
            <div className="conainer col-sm-8 border-start border-end border-dark">
                <div className="row ">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <h2 className='mx-2'>Users</h2>
                <div class="collapse navbar-collapse mx-3" id="navbarSupportedContent">
                    <form class="d-flex form-inline my-2 my-lg-0 mr-2" >
                        <input class="form-control mr-sm-2 mx-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSubmit}/>
                        {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit" >Search</button> */}
                    </form>
                </div>
                </nav>
                </div>
                <div className="row">
                    <Users url={url} />
                </div>
            </div>
       </div>
    </div>
  )
}

export default Dashboard
