const SendToken = async (res, user, statusCode) => {
  // get token
  const userToken = user.getJWTtoken();

  // create a cookie
  const options = {
    maxAge: process.env.COOKIE_LIFETIME * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  };

  // save cookie
  res.status(statusCode).cookie("userToken", userToken, options).json({
    success: true,
    user,
    userToken,
  });
};

module.exports = SendToken;
