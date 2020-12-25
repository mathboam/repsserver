const jwt = require("jsonwebtoken");

const AuthenticateToken = (token) => {
  try {
    const member = jwt.verify(token.token, process.env.ACCESS_TOKEN_SECRET);
    return member;
  } catch (e) {
    return e;
  }
};
module.exports = {
  AuthenticateToken,
};
