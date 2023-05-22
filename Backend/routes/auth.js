const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');



// create a user using : post "/api/auth/". No login required

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
    let user = await User.create({
        name: req.body.name,
        password: req.body.password,      
        email: req.body.email,      
    }).then(user => res.json(user))
    .catch(err=> {console.log(err)
        res.json({error: 'please enter a unique value for email',message: err.message})})
})     

module.exports = router   