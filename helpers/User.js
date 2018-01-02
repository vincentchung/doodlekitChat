'use strict';

module.exports = function(){
  return {
    SignUpValidation: (req, res, next) => {
      req.checkBody('username','Username is required').notEmpty();
      req.checkBody('username','Username Must not be less 5').isLength({min:5});
      req.checkBody('email','email is required').notEmpty();
      req.checkBody('email','email is Invalid').isEmail();
      req.checkBody('password','password is required').notEmpty();

      req.getValidationResult()
      .then((result) => {
        const errors = result.array();
        const messages = [];
        errors.forEach((error) => {
          messages.push(error.msg);
        });

        req.flash('error', messages);
        res.redirect('/signup');
      })
      .catch((err) => {
        return next();
      })
    }
  }
}
