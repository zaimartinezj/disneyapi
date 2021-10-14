const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { newUser, loginUser } = require('../controllers/auth');
const validateFields = require('../middlewares/validateFields');


router.post('/register', [
    body('name').not().isEmpty(),
    body('email').isEmail(),
    body('password').isLength({min:6}),
    validateFields
], newUser)

router.post('/login', [
    body('email').isEmail(),
    body('password').notEmpty(),
    validateFields
], loginUser)

module.exports = router;