const router = require('express').Router();
const { NOT_FOUND_ERROR } = require('../utils/const');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', (req, res) => {
  res
    .status(NOT_FOUND_ERROR)
    .send({ message: 'Карточка не найдена' });
});

module.exports = router;
