const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');


function tokenForUser(user){

    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.signin = function(req,res,next){
    res.send({token:tokenForUser(req.user)});
}

exports.signup = function(req,res,next){

    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        return res.status(422).send({error:"You must provide email and password"});
    }

    console.log(email,password)

   //see if user with that email exists
   User.findOne({email:email}, function(err, existingUser){
       
    if(existingUser) { 
        console.log('Found existing',existingUser)
        return res.status(422).send({error:'Email is in use'});
    }


    //if a with email does NOT exist create and save user record
    const user = new User({email:email, password:password});
    user.save(function(err){
        if(err) {return next(err)};

        console.log('Looks like successful user save',user)
        res.json( { token: tokenForUser(user)});
    })
    

    //Respond to request indicating user was created
   })
   

   


   

}; 