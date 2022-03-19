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
    
  static async findAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        candies
      `
    );
    return rows.map((row) => new Candy(row));
  }
    
  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            candies
        WHERE
            id=$1
      `,
      [id]
    );
    return new Candy(rows[0]);
  }
    
  static async updateById(id, attributes) {
    const existingCandy = await Candy.findById(id);
    const updatedAttributes = { ...existingCandy, ...attributes };
    const { name, manufacturer, ranking } = updatedAttributes;
    const { rows } = await pool.query(
      `
        UPDATE
            candies
        SET
            name=$1,
            manufacturer=$2,
            ranking=$3
        WHERE
            id=$4
        RETURNING
            *
      `,
      [name, manufacturer, ranking, id]
    );
    return new Candy(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM
            candies
        WHERE
            id=$1
         RETURNING 
            *
      `,
      [id]
    );
    return new Candy(rows[0]);
  }
};
