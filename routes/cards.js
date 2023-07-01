const cardsRouter = require('express').Router();

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard
} = require('../controllers/cards');

const { validateCard, validateCardId } = require('../utils/validation');

cardsRouter.get('/', getCards);
cardsRouter.post('/',validateCard, createCard);
cardsRouter.delete('/:cardId', validateCardId, deleteCard);
cardsRouter.put('/:cardId/likes', validateCardId, likeCard);
cardsRouter.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardsRouter;
