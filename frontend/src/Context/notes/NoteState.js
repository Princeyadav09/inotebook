
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState =(props)=>{
    const host = "http://localhost:4000"

    const notesInitial = []


    const [notes,setNotes] = useState(notesInitial)

       // Get all note

       const getNotes = async ()=>{
        //TODO api call

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2Yzc5NTVkZjI5NDk3ODhjZGUwMDI3In0sImlhdCI6MTY4NDgzNzU1MH0.fqRwiKNuyKvkfXEh6bDrud41uvrV7GYSy3mIpxrnytA"
            }
        });

        const json = await response.json()
        console.log(json)
        setNotes(json)

      }

          // Add a note

          const addNote = async (title,description,tag)=>{
            // api call

            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2Yzc5NTVkZjI5NDk3ODhjZGUwMDI3In0sImlhdCI6MTY4NDgzNzU1MH0.fqRwiKNuyKvkfXEh6bDrud41uvrV7GYSy3mIpxrnytA"
                },
                body:JSON.stringify({title,description,tag})
            });
 
            const note = await response.json();
            setNotes(notes.concat(note))
                
          }

          // Delete a note

          const deleteNote = async (id,title,description,tag)=>{
            //Api Call
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2Yzc5NTVkZjI5NDk3ODhjZGUwMDI3In0sImlhdCI6MTY4NDgzNzU1MH0.fqRwiKNuyKvkfXEh6bDrud41uvrV7GYSy3mIpxrnytA"
                },
                body:JSON.stringify({title,description,tag})
            });
            const json = await response.json();
            console.log(json);

            const newNotes = notes.filter((note)=>{return note._id!==id})
            setNotes(newNotes)
          }

          // Edit a note

          const editNote = async (id, title,description,tag)=>{
            // Api call

            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2Yzc5NTVkZjI5NDk3ODhjZGUwMDI3In0sImlhdCI6MTY4NDgzNzU1MH0.fqRwiKNuyKvkfXEh6bDrud41uvrV7GYSy3mIpxrnytA"
                },
                body:JSON.stringify({title,description,tag})
            });
            const json = await response.json();
            console.log(json);

            let newNotes = JSON.parse(JSON.stringify(notes))

            // Logic to edit in client
                for (let index = 0; index < newNotes.length; index++) {
                    const element = newNotes[index];
                    if(element._id === id){
                        newNotes[index].title = title;
                        newNotes[index].description = description;
                        newNotes[index].tag = tag;
                        break;
                    }
               
                }
                console.log(notes);
                setNotes(newNotes);
          }
   
   
    return (
        
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;