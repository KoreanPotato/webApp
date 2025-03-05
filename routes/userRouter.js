const express = require('express');
const router =  express.Router();
const { updateUserBalance } = require('../controllers/userController');


router.post('/:userId/updateBalance', updateUserBalance);

module.exports = router;