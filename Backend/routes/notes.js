const express = require('express');
const router = express.Router();
const fetchuser =require('../middleware/fetchUser');
const Note = require('../models/Note');
const {body,validationResult} = require('express-validator');


// Route :1 Get all teh notes using : GET "/api/auth/getuser". Login required

router.get('/fetchallnotes', fetchuser, async (req, res)=>{
   try {
    const notes = await Note.find({user:req.user.id});
    res.json(notes) 
   } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error"); 
   }

});

// Route :2 Add a new Note using : Post "/api/auth/addnote". Login required

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

    res.json(savedNote)

} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");        
}
   
});


module.exports = router