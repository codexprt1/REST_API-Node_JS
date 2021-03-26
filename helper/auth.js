const expressJwt = require("express-jwt");

const auth = () => {
  const secret = process.env.secret;
  return expressJwt({
    secret,
    algorithms: ["HS256"],
  });
};

module.exports = auth;
