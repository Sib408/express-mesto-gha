const Card = require('../models/card');
const {
  STATUS_OK,
  STATUS_CREATED,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  ERROR_SERVER
} = require('../utils/const');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.status(STATUS_OK).send({ data: cards }))
    .catch(() => res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(STATUS_CREATED).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: 'Некорректные данные' });
      }
      return res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'Карточка не найдена' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: 'Некорректные данные id' });
      }
      return res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'Карточка не найдена' });
      }
      return res.status(STATUS_OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: 'Некорректные данные id' });
      }
      return res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'Карточка не найдена' });
      }
      return res.status(STATUS_OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: 'Некорректные данные id' });
      }
      return res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard
};
