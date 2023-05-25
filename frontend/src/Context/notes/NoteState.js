
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState =(props)=>{

    const notesInitial = [
            {
              "_id": "646e40a8847760a92491cb79",
              "user": "646c7955df2949788cde0027",
              "title": "My Title",
              "description": "Please wake up early",
              "tag": "personal",
              "date": "2023-05-24T16:51:52.755Z",
              "__v": 0
            },
            {
              "_id": "646f10f5f669703826933f01",
              "user": "646c7955df2949788cde0027",
              "title": "My Title",
              "description": "Please wake up early",
              "tag": "personal",
              "date": "2023-05-25T07:40:37.686Z",
              "__v": 0
            },
            {
              "_id": "646f10f9f669703826933f03",
              "user": "646c7955df2949788cde0027",
              "title": "My Title",
              "description": "Please wake up early",
              "tag": "personal",
              "date": "2023-05-25T07:40:41.221Z",
              "__v": 0
            },
            {
              "_id": "646f10f5f669703826933f01",
              "user": "646c7955df2949788cde0027",
              "title": "My Title",
              "description": "Please wake up early",
              "tag": "personal",
              "date": "2023-05-25T07:40:37.686Z",
              "__v": 0
            },
            {
              "_id": "646f10f9f669703826933f03",
              "user": "646c7955df2949788cde0027",
              "title": "My Title",
              "description": "Please wake up early",
              "tag": "personal",
              "date": "2023-05-25T07:40:41.221Z",
              "__v": 0
            }
          ]

          const [notes,setNotes] = useState(notesInitial)
   
   
    return (
        
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;