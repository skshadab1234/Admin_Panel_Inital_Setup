const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No Authorization header provided" });
  }

  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ error: "Invalid Authorization header format" });
  }
  const token = tokenParts[1];

  const data = jwt.verify(token, process.env.SECRET_KEY);

  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

  if (data.exp < currentTime) {
    req.userId = null;
    req.role_id = null;
  }

  req.userId = data.id;
  req.role_id = data.role_id;
  next();
};

module.exports = authenticate;
