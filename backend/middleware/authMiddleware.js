const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.log("❌ No Authorization header");
    return res.status(401).json({ msg: "No token provided" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    console.log("❌ Wrong token format");
    return res.status(401).json({ msg: "Token format invalid" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    console.log("❌ Token missing after split");
    return res.status(401).json({ msg: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 Always standardize user object
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    console.log("❌ JWT VERIFY FAILED:", err.message);
    return res.status(401).json({ msg: "Token invalid or expired" });
  }
};
