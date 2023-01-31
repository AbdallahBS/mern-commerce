const { check , validationResult} = require('express-validator');
exports.validateSignupRequest = [
    check('firstName')
     .notEmpty()
     .withMessage('firstName is required'),
    check('lastName')
     .notEmpty()
     .withMessage('lastName is required'),
    check('lastName'),
    check('email')
     .isEmail()
     .withMessage('Valid email is required'),
    check('password')
     .isLength({min : 6})
     .withMessage('password must be at least 6 caracter long ')
  ];
  exports.validateSigninRequest = [
    check('email')
     .isEmail()
     .withMessage('Valid email is required'),
    check('password')
     .isLength({min : 6})
     .withMessage('password must be at least 6 caracter long ')
  ];
  exports.isRequestValidated = (req,res,next)=>{
        const errors = validationResult(req);
        if(errors.array().length>0){
            return res.status(400).json({errors : errors.array()[0].msg});
        }
        next();
  }