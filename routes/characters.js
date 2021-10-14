const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const {check, body } = require('express-validator');
const validateFields = require('../middlewares/validateFields');
const { newCharacter, listCharacters, editCharacter, deleteCharacter, characterById } = require('../controllers/characters');
const parseToNumber = require('../helpers/parseToNumber');
const formatFormData = require('../middlewares/formatFormData');


const router = express.Router();

router.use(verifyToken);

router.get('/:id', [
    check('id', 'id is required').not().isEmpty(),
    validateFields
], characterById);//description

router.get('/', 
    listCharacters
);
router.post('/', [
    body('name').isString(),
    body('age', "Age is required").not().isEmpty(),
    body('history').isString(),
    body('movies').not().isEmpty(),
    validateFields
], newCharacter);

router.put('/:id', [
    check('id', 'id is required').not().isEmpty(),
    body('name').isString(),
    body('age', 'Age must be a number').custom(value=>
        (typeof value === "number")
    ),
    body('weight', 'Weight must be a number').custom(value=>
        (typeof value === "number")
    ),
    body('history').isString(),
    validateFields
], editCharacter);

router.delete('/:id', [
    check('id', 'id is required').not().isEmpty(), 
    validateFields 
], deleteCharacter);

module.exports = router;
