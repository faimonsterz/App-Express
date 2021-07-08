var express = require('express');
var router = express.Router();
const staffController = require('../controller/staffController');
const passportJWT = require('../middleware/passportJWT');

/* GET users listing. */
router.get('/', [ passportJWT.isLogin ] , staffController.index);
// get by id
router.get('/:id', staffController.show);
// insert
router.post('/', staffController.insert);
//delete
router.delete('/:id', staffController.destroy);
//update
router.put('/:id', staffController.update);

module.exports = router;
