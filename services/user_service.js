const { userDao, productCartDao } = require('../models/');
const bcrypt = require('bcrypt');
const token = require('../utils/token');

const signIn = async (email, password) => {
  const user = await userDao.getUserByEmail(email);

  const isSame = bcrypt.compareSync(password, user.password);

  if (!user) {
    const error = new Error('INVALID_USER');
    error.statusCode = 400;

    throw error;
  }

  if (!isSame) {
    const error = new Error('INVALID_USER');
    error.statusCode = 400;

    throw error;
  }
  const signToken = token.signToken(user.email);
  return signToken;
};

const signUp = async (name, email, password) => {
  const userData = await userDao.getUserByEmail(email);

  if (userData) {
    const error = new Error('EMAIL IS DUPLICATED');
    error.statusCode = 400;

    throw error;
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  return await userDao.createUser(name, email, hashedPassword);
};

const like = async (user_id, product_id) => {
  const userId = await decodedUserId(user_id);
  const likeExist = await doesLikeExist(user_id, product_id);
  if (!likeExist) {
    return await userDao.like(userId, product_id);
  }
  return '이미 좋아요를 눌렀습니다';
};

const unLike = async (user_id, product_id) => {
  const userId = await decodedUserId(user_id);
  const likeExist = await doesLikeExist(user_id, product_id);
  if (likeExist) {
    return await userDao.unlike(userId, product_id);
  }
  return '이미 좋아요 상태가 아닙니다';
};

const doesLikeExist = async (user_id, product_id) => {
  const userId = await decodedUserId(user_id);
  return await userDao.doesLikeExist(userId, product_id);
};

const decodedUserId = async (user_id) => {
  const decodedUserEmail = token.verifyToken(user_id).id;
  const emailToUserId = await productCartDao.getUserIdByEmail(decodedUserEmail);
  const decodedUserId = emailToUserId['id'];
  return await decodedUserId;
};

const userNameFind = async (userId) => {
  const decodedUserName = token.verifyToken(userId).id;
  return await userDao.userNameFind(decodedUserName);
};

module.exports = { signIn, signUp, like, unLike, userNameFind, doesLikeExist };
