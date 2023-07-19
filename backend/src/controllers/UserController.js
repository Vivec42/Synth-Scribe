const argon2 = require("@node-rs/argon2");
const jwt = require("jsonwebtoken");
const models = require("../models");

// const hashingOptions = {
//   type: argon2.argon2id,
//   memoryCost: 2 ** 16,
//   timeCost: 5,
//   parallelism: 1,
// };

const hashPassword = (userPassword) => {
  return argon2.hash(userPassword);
};

const determineCredentials = (credentials) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(credentials)) {
    return "email";
  }
  return "nickname";
};

const checkUserExists = async (id) => {
  const checkUserExistence = await models.user
    .find(id)
    .then((result) => result[0]);

  if (!checkUserExistence.length) {
    return false;
  }
  return true;
};

class UserController {
  static browseUsers = async (req, res) => {
    // const { id, role } = req.body;

    // const checkUserExistence = await models.user
    //   .find(id, role)
    //   .then((result) => result[0]);

    // const isBanned = await models.user
    //   .isUserBanned()
    //   .then((result) => result[0]);

    // if (checkUserExistence) {
    //   return res.status(403).send("Register to access this !");
    // }
    // if (isBanned) {
    //   return res.status(403).send("You are banned from this site !");
    // }

    try {
      return await models.user
        .findAll()
        .then(([usersList]) => {
          res.status(200).send(usersList);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    } catch (err) {
      //prod.liveshare.vsengsaas.visualstudio.com/join?03F645A657813B2D4CB88FF1EA9B48A59465
      return res.status(500).send(err.message);
    }
  };

  /*-------------------------------------------------------- */
  /*-------------------------------------------------------- */

  static findUser = async (req, res) => {
    // const { role } = req.body;

    // const checkUserExistence = await models.user
    //   .find(req.params.id, role)
    //   .then((result) => result[0]);

    // if (!checkUserExistence) {
    //   return res.status(403).send("Register to access this !");
    // }
    // if (!checkUserExistence.length) {
    //   return res.status(404).send("This user doesn't exist !");
    // }

    try {
      return await models.user
        .find(req.params.id)
        .then(([userData]) => {
          res.status(200).send(userData);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  /*-------------------------------------------------------- */
  /*-------------------------------------------------------- */

  // static edit = (req, res) => {
  //   const item = req.body;

  //   item.id = parseInt(req.params.id, 10);

  //   models.item
  //     .update(item)
  //     .then(([result]) => {
  //       if (result.affectedRows === 0) {
  //         res.sendStatus(404);
  //       } else {
  //         res.sendStatus(204);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.sendStatus(500);
  //     });
  // };

  /*-------------------------------------------------------- */
  /*-------------------------------------------------------- */

  static register = async (req, res) => {
    const user = req.body;
    if (!user.nickname || !user.email || !user.password) {
      return res.sendStatus(400);
    }

    try {
      const validData = await models.user.validate(user);
      if (!validData) {
        return res.status(403).send("Your data are not valid");
      }

      const emailAlreadyExist = await models.user
        .findByEmail(user.email)
        .then((result) => result[0]);

      if (emailAlreadyExist.length !== 0) {
        return res.status(403).send("This emailed is already registred");
      }

      const nicknameAlreadyExist = await models.user
        .findByNickname(user.nickname)
        .then((result) => result[0]);

      if (nicknameAlreadyExist.length !== 0) {
        return res.status(403).send("This nickname is already registred");
      }

      const hashedPassword = await hashPassword(user.password);
      delete user.password;

      return await models.user
        .insertUser({ ...user, hashedPassword })
        .then(([result]) => {
          return res
            .location("/login")
            .status(201)
            .json({ ...user, id: result.insertId });
        })
        .catch((err) => {
          console.error(err);
          return res.sendStatus(500);
        });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  /*-------------------------------------------------------- */
  /*-------------------------------------------------------- */

  static login = async (req, res) => {
    const { credentials, password } = req.body;
    if (!credentials || !password) {
      return res.sendStatus(400);
    }

    try {
      const credentialType = await determineCredentials(credentials);
      const validData = await models.user.validateLogin(
        {
          credentials,
          password,
        },
        credentialType === "email"
      );
      if (!validData) {
        return res.status(403).send("Your data are not valid");
      }

      const userData =
        credentialType === "email"
          ? await models.user
              .findByEmail(credentials, true)
              .then((result) => result[0])
          : await models.user
              .findByNickname(credentials, true)
              .then((result) => result[0]);

      if (userData.length === 0) {
        return res.status(404).send(`User with ${credentials} not found`);
      }
      if (!argon2.verifySync(userData[0].hashedPassword, password)) {
        return res.sendStatus(403);
      }

      const token = jwt.sign(
        {
          id: userData[0].id,
          nickname: userData[0].nickname,
          role: userData[0].role,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRESIN }
      );
      delete userData[0].hashedPassword;
      return res
        .cookie("accessToken", token, {
          httpOnly: true,
          secure: process.env.JWT_SECURE === "true",
          maxAge: parseInt(process.env.JWT_COOKIE_MAXAGE, 10),
        })
        .status(200)
        .json(userData);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  /*-------------------------------------------------------- */
  /*-------------------------------------------------------- */

  static banUser = async (req, res) => {
    const { id } = req.params;
    try {
      const userExists = await checkUserExists(id);
      if (!userExists) {
        return res.status(404).send("This user doesn't exist");
      }

      const [[bannedStatus]] = await models.user.isUserBanned(id);
      const [toggleBan] = await models.user.banUser(id, !bannedStatus.banned);

      if (toggleBan.changedRows === 0) {
        return res.status(400).send("Banned status not updated !");
      }

      return res
        .status(200)
        .send(
          `The user ${bannedStatus.nickname} has been ${
            !bannedStatus.banned ? "banned" : "unbanned"
          }`
        );
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  /*-------------------------------------------------------- */
  /*-------------------------------------------------------- */

  static deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
      const userExists = await checkUserExists(id);
      if (!userExists) {
        return res
          .status(404)
          .send("This user doesn't exist or is already deleted !");
      }

      return models.user.delete(req.params.id).then(() => {
        res.sendStatus(204);
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
}

module.exports = UserController;
