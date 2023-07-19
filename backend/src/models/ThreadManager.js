const AbstractManager = require("./AbstractManager");

class ThreadManager extends AbstractManager {
  static table = "thread";

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

  updateThread(thread) {
    return this.connection.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      thread,
      thread.id,
    ]);
  }
}

module.exports = ThreadManager;
