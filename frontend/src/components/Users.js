import React, { useState,useEffect } from 'react'

const Users = (props) => {

    const [users,setUsers] = useState([])
    const URL = props.url

    useEffect( () => {( async () =>{
        const resp = await fetch(props.url,{
            method: "GET",
        })
        const json = await  resp.json();
        setUsers(json);
     })();
    },[props.url]);

  return (
    <div className='container'>
        <div className="row mt-5">
            <div className="col-4"><h5>Name</h5></div>
            <div className="col-4"><h5>Email</h5></div>
            <div className="col-4"><h5>Notes</h5></div>
        </div>
        {
            users.map((user)=>(
                <div className='row'>
                    <div className="col-4">{user.name} </div> 
                    <div className="col-4">{user.email}</div>
                    <div className="col-4">{user.nomOfnotes}</div>
                </div>
            ))
        }
    </div>
  )
}

export default Users
