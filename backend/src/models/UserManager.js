const AbstractManager = require("./AbstractManager");
const {
  schemaRegister,
  schemaLoginNickname,
  schemaLoginEmail,
} = require("../joiSchemas");

class UserManager extends AbstractManager {
  static table = "user";

  isUserBanned(id) {
    return this.connection.query(
      `SELECT id, banned FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }

  findByEmail(email, login = false) {
    if (login) {
      return this.connection.query(
        `SELECT id, hashedPassword, role, nickname FROM ${this.table} WHERE email = ?`,
        [email]
      );
    }
    return this.connection.query(
      `SELECT id FROM ${this.table} WHERE email = ?`,
      [email]
    );
  }

  findByNickname(nickname, login = false) {
    if (login) {
      return this.connection.query(
        `SELECT id, hashedPassword, role, nickname FROM ${this.table} WHERE nickname = ?`,
        [nickname]
      );
    }
    return this.connection.query(
      `SELECT id FROM ${this.table} WHERE nickname = ?`,
      [nickname]
    );
  }

  insert(user) {
    return this.connection.query(
      `INSERT INTO ${this.table} (nickname, email, hashedPassword) VALUES (?, ?, ?)`,
      [user.nickname, user.email, user.hashedPassword]
    );
  }

  update(user) {
    return this.connection.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      user,
    ]);
  }

  async validate(user) {
    try {
      await schemaRegister.validateAsync(user);
      return true;
    } catch (err) {
      return false;
    }
  }

  async validateLogin(user, email = false) {
    try {
      if (email) {
        await schemaLoginEmail.validateAsync(user);
        return true;
      }
      await schemaLoginNickname.validateAsync(user);
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = UserManager;
