const Card = require('../models/card');
const { STATUS_OK, STATUS_CREATED } = require('../utils/const');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../utils/errors/index');

const getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.status(STATUS_OK).send({ data: cards }))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(STATUS_CREATED).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректные данные'));
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Вы не можете удалить чужую карточку'));
      }

      return res.send({ data: card });
    })
    .then((card) => Card.deleteOne(card))
    .then(() => res.status(STATUS_OK).send({ message: 'Карточка удалена' }))
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка не найдена'));
      }
      return res.status(STATUS_OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректные данные id'));
      }
      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка не найдена'));
      }
      return res.status(STATUS_OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректные данные id'));
      }
      return next(err);
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard
};
