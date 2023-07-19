const AbstractManager = require("./AbstractManager");
const {
  schemaRegister,
  schemaLoginNickname,
  schemaLoginEmail,
} = require("../joiSchemas");

class UserManager extends AbstractManager {
  static table = "user";

  banUser(id, value) {
    return this.connection.query(
      `UPDATE  ${this.table} SET banned = ? WHERE id = ?`,
      [value, id]
    );
  }

  isUserBanned(id) {
    return this.connection.query(
      `SELECT id, nickname, banned FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }

  findAll() {
    return this.connection.query(
      `SELECT nickname, profilePicture, profileBanner, description, language, country, city, registeredDate, banned FROM  ${this.table}`
    );
  }

  find(id) {
    return this.connection.query(
      `SELECT nickname, profilePicture, profileBanner, description, language, country, city, registeredDate, id, role  FROM  ${this.table} WHERE id = ?`,
      [id]
    );
  }

  getUserRole(id) {
    return this.connection.query(
      `SELECT role FROM ${this.table} WHERE id = ?`,
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

  insertUser(user) {
    return this.connection.query(
      `INSERT INTO ${this.table} (nickname, email, hashedPassword) VALUES (?, ?, ?)`,
      [user.nickname, user.email, user.hashedPassword]
    );
  }

  updateUser(user) {
    return this.connection.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      user,
    ]);
  }

  delete(id) {
    return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [
      id,
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
