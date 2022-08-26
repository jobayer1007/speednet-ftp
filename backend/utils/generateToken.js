const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

// dotenv.config();

// // const generateToken = (id) => {
// //   return jwt.sign({ id }, process.env.JWT_SECRET, {
// //     expiresIn: '30d',
// //   });
// // };

// // module.exports = generateToken;

exports.generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

exports.passwordResetToken = ({
  password,
  userId: id,
  updatedAt,
  // createdAt,
}) => {
  // console.log(id);
  // console.log(password);
  // console.log(updatedAt);
  // console.log(createdAt);
  const secret = password + '-' + updatedAt;
  // const secret2 = password + '-' + createdAt;
  const token = jwt.sign({ id }, secret, {
    expiresIn: 3600, // 1 hour
  });
  // const token2 = jwt.sign({ id }, secret2, {
  //   expiresIn: 3600, // 1 hour
  // });

  // const payload1 = jwt.verify(token, secret1);
  // const payload2 = jwt.decode(token2, secret2);
  // console.log(payload1);
  // console.log(payload2);
  // console.log(secret1);
  // console.log(secret2);
  // console.log(`Token1 : ${token}`);
  // console.log(`Token2 : ${token2}`);
  return token;
};
