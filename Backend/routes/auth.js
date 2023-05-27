const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser =require('../middleware/fetchUser');

const JWT_SECRET = "Harryisagoodb$oy";


// Route :1 create a user using : post "/api/auth/createuser". No login required

router.post('/createuser',[
    body('name','Enter a valid name').isLength({min: 3}),
    body('email','Enter valid email').isEmail(),
    body('password','password must be at least 5 characters').isLength({min: 5}),
] , async (req, res)=>{
    let success = false;
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors: errors.array() });
    }
   
    try {
         // check whether the user with this email exists already
    let user = await User.findOne({email: req.body.email});
    // console.log(user)
    if(user){
        return res.status(400).json({success,error:"Sorry a user with this email already exists"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);

    //creating a new user
     user = await User.create({
        name: req.body.name,
        password: secPass,      
        email: req.body.email,      
    });
    
    const data = {
        user:{
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    
   success=true;
    res.json({success,authtoken})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}) 

// Route :2 Authenticate a user using : post "/api/auth/login". No login required
router.post('/login',
// [
    
//     body('email','Enter valid email').isEmail(),
//     body('password','password cannot be blank').exists(),
   
// ] 
// ,
 async (req, res)=>{
    let success = false;
     // If there are errors, return bad request and the errors
    // const errors = validationResult(req);
    //  if(!errors.isEmpty()){
    //      return res.status(400).json({errors: errors.array() });
    //  }
    const {email,password} =req.body;
    console.log(req.body);
    console.log(email,password);
    if(!email || !password){
        return res.status(400).json({error: "Email and password are not found"})

    }


     

     try {
        let user = await User.findOne({email});
        if(!user){
            success =false;
            return res.status(400).json(success,{error:"Please try to login with correct credential"});
        }

        const passwordComapre = await bcrypt.compare(password,user.password);
        if(!passwordComapre){
            success =false;
            return res.status(400).json({success,error:"Please try to login with correct credential"});
        } 

        const data = {
            user:{
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success= true;
        res.json({success,authtoken})

     } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error"); 
     }

});

// Route :3 Get loggedin user details using : post "/api/auth/getuser". No login required
router.post('/getuser',fetchuser , async (req, res)=>{

    try {
        userId=req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error"); 
    }

});

module.exports = router   