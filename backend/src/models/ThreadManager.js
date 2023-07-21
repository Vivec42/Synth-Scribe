const AbstractManager = require("./AbstractManager");

class ThreadManager extends AbstractManager {
  static table = "thread";

  getAllTitles() {
    return this.connection.query(
      `SELECT id, title, creationDate FROM ${this.table} ORDER BY creationDate, id ASC`
    );
  }

  getById(id) {
    return this.connection.query(
      `SELECT t.id, t.title, t.description, t.creationDate, u.nickname FROM ${this.table} AS t LEFT JOIN user AS u ON u.id = t.user_id WHERE t.id = ?`,
      [id]
    );
  }

  findByTitle(title) {
    return this.connection.query(
      `SELECT title FROM ${this.table} WHERE title = ?`,
      [title]
    );
  }

  insertThread(thread) {
    return this.connection.query(
      `INSERT INTO ${this.table} (title, description, user_id) VALUES (?, ?, ?)`,
      [thread.title, thread.description, thread.user_id]
    );
  }

  updateThread(thread, id) {
    return this.connection.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      thread,
      id,
    ]);
  }
}

module.exports = ThreadManager;
