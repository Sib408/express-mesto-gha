const usersRouter = require('express').Router();

const {
  getUsers,
  getCurrentUser,
  updateUser,
  updateAvatar,
  getUserById,
  createUsers,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUsers);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
