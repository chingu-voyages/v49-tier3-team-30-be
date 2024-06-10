const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-tokenn"];
  if (!accessToken)
    return res.status(401).json({ error: "User not logged in!" }); 

  try {
    const validToken = verify(accessToken, process.env.SECRET_KEY);
    req.user = validToken; //{ username: 'peter',  userId: '665e70b437a5e2d550fa7293',  iat: 1717468632 }
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.status(403).json({ error: "Token is not valid!" });
  }
};

module.exports = { validateToken };
