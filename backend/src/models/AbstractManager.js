class AbstractManager {
  constructor(connection, table) {
    this.connection = connection;
    this.table = table;
  }

  find(id) {
    return this.connection.query(`SELECT * FROM  ${this.table} WHERE id = ?`, [
      id,
    ]);
  }

  findAll() {
    return this.connection.query(`SELECT * FROM  ${this.table}`);
  }

  delete(id) {
    return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [
      id,
    ]);
  }
}

module.exports = AbstractManager;
