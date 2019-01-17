const authentication = require('./controlers/authentication');
const passport = require('passport');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app){
    
    app.get('/', function(req,res){
        console.log("Hit basic");
        res.send("Hi you")
    })
    // app.get('/', requireAuth, function(req,res){
    //     res.send("Hi There");
    // })

    app.post('/signin', requireSignin, authentication.signin);
    app.post('/signup', authentication.signup);



}