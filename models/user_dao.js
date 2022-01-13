const prisma = require('./index');
const bcrypt = require('bcrypt');

function hashing(password) {
  const hashed = bcrypt.hashSync(password, 10);
  return hashed;
}

const getUserByEmail = async (email) => {
  const [user] = await prisma.$queryRaw`
    SELECT 
      email, password 
    FROM 
      users WHERE email = ${email}
    `;
  console.log('user in dao: ', user);
  return user;
};

const createUser = async (name, email, password) => {
  password = hashing(password);
  const createData = await prisma.$queryRaw`
        INSERT INTO 
          users (name, email, password ) 
        VALUES 
          (${name}, ${email}, ${password})
        `;

  return createData;
};

const like = async (user_id, product_id) => {
  await prisma.$queryRaw`
  INSERT INTO
    users_isLikes (user_id, product_id)
  VALUES
    (${user_id}, ${product_id});
  `;
  return 'LIKED';
};

const unlike = async (user_id, product_id) => {
  await prisma.$queryRaw`
  DELETE FROM
    users_isLikes
  WHERE
    user_id=${user_id} and product_id=${product_id}
  `;
  return 'LIKE_CANCELLED';
};

const doesLikeExist = async (user_id, product_id) => {
  const [likeExist] = await prisma.$queryRaw`
  SELECT 
    user_id,product_id
  FROM
    users_isLikes
  WHERE
    user_id=${user_id} and product_id=${product_id}
`;
  return likeExist ? true : false;
};

const getUserIdByEmail = async (email) => {
  const [userId] = await prisma.$queryRaw`
    SELECT 
      id 
    FROM 
      users 
    WHERE 
      email = ${email};
    `;
  return userId;
};

const userNameFind = async (decodedUserName) => {
  const [userNameFind] = await prisma.$queryRaw`
    SELECT 
      name
    FROM
      users
    WHERE
      email=${decodedUserName}`;

  return userNameFind;
};

module.exports = {
  getUserByEmail,
  createUser,
  like,
  unlike,
  doesLikeExist,
  getUserIdByEmail,
  userNameFind,
};
