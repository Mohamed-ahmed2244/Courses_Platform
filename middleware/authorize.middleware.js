const authorizeMiddleware = (...roles) => {
  return (req, res, next) => {
    console.log("req.user =", req.user);
    console.log("roles =", roles);
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "Forbidden",
      });
    }

    next();
  };
};

module.exports = authorizeMiddleware;