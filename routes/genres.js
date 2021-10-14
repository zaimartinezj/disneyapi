const express = require('express');
const { listGenres, newGenre, deleteGenre } = require('../controllers/genres');
const { body } = require('express-validator');
const verifyToken = require('../middlewares/verifyToken');
const validateFields = require('../middlewares/validateFields');
const formatFormData = require('../middlewares/formatFormData');
const router = express.Router();

router.use(verifyToken);

router.post('/', [
  body('name', 'Name is required').not().isEmpty(),
  validateFields
], newGenre)

router.get('/', listGenres)

router.delete('/:id', deleteGenre);

module.exports = router;