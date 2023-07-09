const express = require('express');
const router = express.Router();
const fetchuser =require('../middleware/fetchUser');
const Note = require('../models/Note');
const {body,validationResult} = require('express-validator');
const User = require('../models/User');


// video 52
// Route :1 Get all the notes using : GET "/api/notes/getuser". Login required

router.get('/fetchallnotes', fetchuser, async (req, res)=>{
   try {
    const notes = await Note.find({user:req.user.id});
    res.json(notes) 
   } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error"); 
   }

});

// Route :2 Add a new Note using : Post "/api/notes/addnote". Login required

router.post('/addnote', fetchuser, [

    body('title','Enter a valid title').isLength({min: 3}),
    body('description','description must be at least 5 characters').isLength({min: 5}),

] , async (req, res)=>{

try {
        
    const {title,description,tag} = req.body;
   
     // If there are errors, return bad request and the errors
     const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array() });
     }

     const note = new Note({
        title, description, tag, user: req.user.id
     })
     const savedNote = await note.save()

    await User.updateOne({
        _id: req.user.id
    }, {
        $inc: {
            nomOfnotes: 1
        }
    })

    res.json(savedNote)

} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");        
}
   
});

// Route :3 Update an existing note : Put "/api/notes/updatenote". Login required

router.put('/updatenote/:id', fetchuser, async (req, res)=>{

    const {title,description,tag} =req.body;
    try {
  
    //create a newNote object
    const newNote = {};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
    res.json({note});
          
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");   
    }

});

// Route :4 Delete an existing note : delete "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    
    try {
  
    //Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    // allow deletion only if user owns this Note

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id)

    await User.updateOne({
        _id: req.params.id
    }, {
        $inc: {
            nomOfnotes: -1
        }
    })

    res.json({"Success":"Note has been delete",note:note});
          
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");      
    }

});


module.exports = router