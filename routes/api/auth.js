const express = require('express');
const router = express.Router();
const validate = require('../../app/Http/Middleware/validate.js')

// Middleware
const authenticateToken = require('../../app/Http/Middleware/authenticateToken.js');

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
    PreRePaRequest,
    ConfirmPinRequest,
    ResetPassRequest
}   = require('../../app/Http/Requests/Auth/');


router.post('/register', validate(RegisterRequest), RegisterController.register)

router.post('/login', validate(LoginRequest), LoginController.login) 

router.get('/refresh', authenticateToken.handle, RefreshController.refresh)

router.get('/me', authenticateToken.handle, MeController.me)

router.get('/emailVerification/:verification_code', VerificationController.emailVerification)

router.post('/preResetPassword', validate(PreRePaRequest), ResetPassController.preResetPassword) 

router.post('/confirmPincode', validate(ConfirmPinRequest), ResetPassController.confirmPincode) 

router.post('/resetPassword', validate(ResetPassRequest), ResetPassController.resetPassword) 


module.exports = router;