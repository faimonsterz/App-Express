const express = require('express');
const router = express.Router();
const companyController = require('../controller/companyController');
const checkAdmin = require('../middleware/checkAdmin');
const passportJWT = require('../middleware/passportJWT');

router.get('/', [
    passportJWT.isLogin,
    checkAdmin.isAdmin 
],companyController.index);
module.exports = router;
