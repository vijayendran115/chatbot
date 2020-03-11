
var express = require('express');
var router = express.Router();

const [ index, chat ] = require('./../controllers/bot/index.controler');
router.get('/', index);
router.post('/', chat);

module.exports = router;