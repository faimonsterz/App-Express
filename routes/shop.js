var express = require('express');
var router = express.Router();
const shopController = require('../controller/shopController');

/* GET users listing. */
router.get('/', shopController.index);
// get menu
router.get('/menu', shopController.menu);
//
router.get('/:id', shopController.getShopWithMenu);
// insert with file
router.post('/', shopController.insert);

module.exports = router;
