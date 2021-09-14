const express = require('express');
const router = express.Router();
const validate = require('../../app/Http/Middleware/validate.js')

// Middleware
const AuthenticateToken = require('../../app/Http/Middleware/AuthenticateToken.js');

// Controllers
const { 
    LoginController, 
    RegisterController, 
    RefreshController, 
    MeController, 
    VerificationController, 
    ResetPassController  
}   = require('../../app/Http/Controllers/Auth');

// Requests
const {
    RegisterRequest,
    LoginRequest,
    CreatePincode,
    ConfirmPinRequest,
    ResetPassRequest
}   = require('../../app/Http/Requests/Auth/');


router.post('/register', validate(RegisterRequest), RegisterController.register)

router.post('/login', validate(LoginRequest), LoginController.login) 

router.get('/refresh', AuthenticateToken.handle, RefreshController.refresh)

router.get('/me', AuthenticateToken.handle, MeController.me)

router.get('/emailVerification/:verification_code', VerificationController.emailVerification)

router.post('/createPincode', validate(CreatePincode), ResetPassController.createPincode) 

router.post('/confirmPincode', validate(ConfirmPinRequest), ResetPassController.confirmPincode) 

router.post('/resetPassword', validate(ResetPassRequest), ResetPassController.resetPassword) 


module.exports = router;