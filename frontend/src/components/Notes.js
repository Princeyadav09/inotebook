import noteContext from "../Context/notes/noteContext"
import React, {useContext} from 'react'
import Noteitem from "./Noteitem";


function Notes() {
    const context = useContext(noteContext);
    const {notes} = context;
  return (

         <div className="row my-3">
            <h2>Your Notes</h2>
            {notes.map((note)=>{
                return <Noteitem key={note._id} note={note}></Noteitem>
            })}
        </div>
  )
}

export default Notes
