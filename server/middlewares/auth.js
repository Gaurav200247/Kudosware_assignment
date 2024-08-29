const { StatusCodes } = require("http-status-codes");
const customAPIError = require("../errors/customAPIError");
const JWT = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const { userToken } = req.cookies;

  if (!userToken) {
    throw new customAPIError(
      "Please login to access this Route...",
      StatusCodes.UNAUTHORIZED
    );
  }

  try {
    const decoded = JWT.verify(userToken, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    throw new customAPIError(
      "Invalid token. Please login again.",
      StatusCodes.UNAUTHORIZED
    );
  }
};

module.exports = { authMiddleware };
