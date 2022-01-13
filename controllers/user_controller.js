const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const REQUIRED_KEYS = { email, password };

    for (let key in REQUIRED_KEYS) {
      if (!REQUIRED_KEYS[key]) {
        return res.status(400).json({ message: 'KEY_ERROR' });
      }
    }

    const user = await userService.signIn(email, password);
    const token = jwt.sign({ id: 1 }, email, { expiresIn: '30m' });
    return res.status(200).json({ message: 'LOGIN_SUCCEES', user, token });
  } catch (err) {
    console.log('controller error: ', err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const REQUIRED_KEYS = { email, password };

    for (let key in REQUIRED_KEYS) {
      if (!REQUIRED_KEYS[key]) {
        return res.status(400).json({ message: 'KEY_ERROR' });
      }
    }

    const checkId = email.includes('@') ? true : false; // ID, Password 유효성 검증
    const checkPw = password.length >= 6 ? true : false;

    if (!checkId || !checkPw) {
      const error = new Error('CHECK YOUR EMAIL OR PASSWORD AGAIN');
      error.statusCode = 400;

      throw error;
    }

    const user = await userService.signUp(name, email, password);

    return res
      .status(201)
      .json({ message: 'REGISTER_SUCCEES', email, password });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const like = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    const like = await userService.like(user_id, product_id);

    return res
      .status(200)
      .json({ message: 'LIKE_SUCCEES', user_id, product_id });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const unLike = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;
    const unLike = await userService.unLike(user_id, product_id);

    return res
      .status(200)
      .json({ message: 'UNLIKE_SUCCEES', user_id, product_id });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const userNameFind = async (req, res) => {
  try {
    const { userId } = req.body;

    const userNameFind = await userService.userNameFind(userId);

    return res.status(200).json(userNameFind);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { signIn, signUp, userNameFind, like, unLike };
