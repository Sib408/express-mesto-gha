const User = require('../models/user');
const {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  ERROR_SERVER
} = require('../utils/const');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((users) => {
      if (!users) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь не найден' });
      }
      return res.send({ data: users });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: 'Некорректные данные id' });
      }
      return res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => next(err));
};

const createUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: 'Некорректные данные пользователя' });
      }
      return res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь не найден' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: 'Некорректные данные пользователя' });
      }
      return res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })

    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь не найден' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: 'Некорректные данные пользователя' });
      }
      return res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = {
  getUsers, getUserById, createUsers, updateUser, updateAvatar, getCurrentUser
};
