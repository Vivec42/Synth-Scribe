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

class UserController {
  // static browse = (req, res) => {
  //   models.item
  //     .findAll()
  //     .then(([rows]) => {
  //       res.send(rows);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.sendStatus(500);
  //     });
  // };

  // static read = (req, res) => {
  //   models.item
  //     .find(req.params.id)
  //     .then(([rows]) => {
  //       if (rows[0] == null) {
  //         res.sendStatus(404);
  //       } else {
  //         res.send(rows[0]);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.sendStatus(500);
  //     });
  // };

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
        .insert({ ...user, hashedPassword })
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

      delete userData[0].hashedPassword;

      const token = jwt.sign(
        {
          id: userData[0].id,
          nickname: userData[0].nickname,
          role: userData[0].role,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRESIN }
      );
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

  // static destroy = (req, res) => {
  //   models.item
  //     .delete(req.params.id)
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
}

module.exports = UserController;
