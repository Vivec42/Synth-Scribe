const jwt = require("jsonwebtoken");
const models = require("../models");

class AuthController {
  static isUserConnected = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).send("You are not logged in !");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.decodedToken = decoded;

      return next();
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  /*-------------------------------------------------------- */
  /*-------------------------------------------------------- */

  static refreshToken = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.sendStatus(204);
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return models.user.find(decoded.id).then(([users]) => {
        if (users.length === 0) {
          return res.sendStatus(404);
        }
        const userData = { ...users[0] };
        const refreshedToken = jwt.sign(
          {
            id: userData.id,
            role: userData.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRESIN }
        );
        return res
          .cookie("accessToken", refreshedToken, {
            httpOnly: true,
            secure: process.env.JWT_SECURE === "true",
            maxAge: parseInt(process.env.JWT_COOKIE_MAXAGE, 10),
          })
          .status(200)
          .json(userData);
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  /*-------------------------------------------------------- */
  /*-------------------------------------------------------- */

  static isUserAllowedToGet = (req, res, next) => {
    if (
      req.decodedToken.role === "MODO" ||
      req.decodedToken.role === "ADMIN" ||
      parseInt(req.params.id, 10) === req.decodedToken.id
    ) {
      return next();
    }
    return res.status(403).send("You can't do that !");
  };

  static isUserModo = async (req, res, next) => {
    const { id, role } = req.decodedToken;

    const [verifyUserRole] = await models.user
      .getUserRole(id)
      .then((result) => result[0]);

    if (role === "ADMIN" && verifyUserRole.role === "ADMIN") {
      return next();
    }

    if (role !== "MODO" || verifyUserRole.role !== "MODO") {
      return res.status(403).send("You can't do that !");
    }

    return next();
  };

  /*-------------------------------------------------------- */
  /*-------------------------------------------------------- */

  static isUserAdmin = async (req, res, next) => {
    const { id, role } = req.decodedToken;

    const [verifyUserRole] = await models.user
      .getUserRole(id)
      .then((result) => result[0]);

    if (role !== "ADMIN" || verifyUserRole.role !== "ADMIN") {
      return res.status(403).send("You can't do that !");
    }

    return next();
  };
}

module.exports = AuthController;
