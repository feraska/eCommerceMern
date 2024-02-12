const jwt = require("jsonwebtoken")
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if(!authHeader) {
        return res.status(400).json("You are not authenticated!")
    }
    jwt.verify(authHeader, process.env.JWT_SEC, (err, user) => {
    if (err) {
        return res.status(400).json("Token is not valid!")
        }
         
        req.user = user;
        next();
      });
}
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return res.status(400).json("You are not alowed to do that!");
      }
    });
  };
  const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return res.status(400).json("You are not alowed to do that!");
      }
    })
}
  
module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}