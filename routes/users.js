const usersRouter = require('express').Router();

const { getUsers, getCurrentUser, updateUser, updateAvatar, getUserById } = require('../controllers/users');

const { validateUpdateUser, validateUserId, validateAvatar } = require('../utils/validation');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/:userId', validateUserId, getUserById);
usersRouter.patch('/me', validateUpdateUser, updateUser);
usersRouter.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = usersRouter;
