var express = require('express');
var router = express.Router();
var getFunction = require('../controllers/getFunction');


/* GET home page. */
router.post('/', getFunction.get);
router.post('/submit', getFunction.submit);
router.get('/retriveAll', getFunction.retriveAll);
router.get('/retriveOneEntry', getFunction.retriveOneEntry);


module.exports = router;
