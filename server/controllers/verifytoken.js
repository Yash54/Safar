const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(404).json({ message: "No Token" });
  }
  jwt.verify(token, "Safar", (err, decoded) => {
    if (err) {
      return res.status(404).json({ message: "Unauthorized!!" });
    }
    req.userId = decoded.id;
    req.email = decoded.email;
    next();
  });
};