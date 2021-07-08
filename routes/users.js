var express = require('express');
const {body} = require('express-validator');
var router = express.Router();
const userController = require('../controller/userController');
const passportJWT = require('../middleware/passportJWT');

/* GET users listing. */
router.get('/', userController.index);
router.post('/login', userController.login);
router.post('/register', [
    body('name').not().isEmpty().withMessage('please insert name'),
    body('email').not().isEmpty().withMessage('please insert Email').isEmail().withMessage('Email is not correct'),
    body('password').not().isEmpty().withMessage('please insert password').isLength({min:3}).withMessage('please insert character more 3'),
],userController.register);

router.get('/me', [ passportJWT.isLogin ] , userController.me);

module.exports = router;
