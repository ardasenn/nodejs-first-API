const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers.authorization || req.header.Atuthorization;

  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const token = authHeader.split(" ");
  jwt.verify(token[1], process.env.ACCES_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token

    req.user = decoded.UserInfo.email;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJwt;
