const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');



// create a user using : post "/api/auth/createuser". No login required

router.post('/createuser',[
    body('name','Enter a valid name').isLength({min: 3}),
    body('email','Enter valid email').isEmail(),
    body('password','password must be at least 5 characters').isLength({min: 5}),
] , async (req, res)=>{
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    // check whether the user with this email exists already
    try {
    let user = await User.findOne({email: req.body.email});
    // console.log(user)
    if(user){
        return res.status(400).json({error:"Sorry a user with this email already exists"})
    }
    //creating a new user
     user = await User.create({
        name: req.body.name,
        password: req.body.password,      
        email: req.body.email,      
    })
    
   
    res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})     

module.exports = router   