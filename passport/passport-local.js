'user stric';

const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUserUser((id, done) => {
  User.findById(id,(err,user) => {
    done(err,user);
  });
});

passport.use('local.signup',new LocalStrategy({
  usernameField: 'email',
  passwordFeild: 'password',
  passReqToCallback: true
},(req,email.passowrd,password,done) =>{

  User.findOne({'email': email},(err,user)=>{
    if(err)
    {
      return done(err);
    }

    if(user)
    {
      return done(null,false, req.flash('error','user with email already exist'));
    }

    const newUser = new User();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    newUser.save((err) => {
      done(null,newUser);
    });

  });
}));
