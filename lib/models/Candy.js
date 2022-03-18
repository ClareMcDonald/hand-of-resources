const pool = require('../utils/pool');

module.exports = class Candy {
  id;
  name;
  manufacturer;
  ranking;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.manufacturer = row.manufacturer;
    this.ranking = row.ranking;
  }

  static async insert({ name, manufacturer, ranking }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            candies (name, manufacturer, ranking)
        VALUES
            ($1, $2, $3)
        RETURNING
            *
      `,
      [name, manufacturer, ranking]
    );
    return new Candy(rows[0]);
  }
};
