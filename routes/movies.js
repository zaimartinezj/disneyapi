const express = require('express');
const router = express.Router();
const { check, body} = require('express-validator');

const { newMovie, listMovies, deleteMovie, movieById, editMovie } = require('../controllers/movies');
const formatDate = require('../helpers/formatDate');
const validateFields = require('../middlewares/validateFields');
const verifyToken = require('../middlewares/verifyToken');

const formatFormData = require('../middlewares/formatFormData');
const parseToNumber = require('../helpers/parseToNumber');

router.use(verifyToken);

router.get('/:id', movieById);

router.get('/', listMovies);

router.post('/', formatDate, [
    body('title').not().isEmpty(),
    body('rating', 'Rating is required').not().isEmpty(),
    body('rating', 'Rating must be a number').not().isString(),
    body('rating', "Invalid rating. The value must be between 1 and 5").custom((value)=>{
        return value >= 1 && value <= 5
}),
    body('genre').not().isEmpty(),
    validateFields
],  newMovie);

router.put('/:id', formatDate, [
    body('title').not().isEmpty(),
    body('rating', 'Rating is required').not().isEmpty(),
    body('rating', 'Rating must be a number').not().isString(),
    body('rating', "Invalid rating. The value must be between 1 and 5").custom((value)=>
        (value >= 1 && value <=5)
    ),
    body('genre').not().isEmpty(),
    validateFields
], editMovie)

router.delete('/:id', [
    check('id').not().isEmpty(),
], deleteMovie);

module.exports = router;