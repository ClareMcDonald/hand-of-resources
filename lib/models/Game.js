const games = require('../controllers/games');
const pool = require('../utils/pool');

module.exports = class Game {
  id;
  name;
  publisher;
  platforms;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.publisher = row.publisher;
    this.platforms = row.platforms;
  }
    
  static async insert({ name, publisher, platforms }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            games (name, publisher, platforms)
        VALUES
            ($1, $2, $3)
        RETURNING
            *
      `,
      [name, publisher, platforms]  
    );
    return new Game(rows[0]);
  }
    
  static async findAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        games
      ` 
    );
    return rows.map((row) => new Game(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            games
        WHERE
            id=$1
      `,
      [id]
    );
    return new Game(rows[0]);
  }
    
  static async updateById(id, attributes) {
    const existingGame = await Game.findById(id);
    const updatedAttributes = { ...existingGame, ...attributes };
    const { name, publisher, platforms } = updatedAttributes;
    const { rows } = await pool.query(
      `
        UPDATE
            games
        SET
            name=$1,
            publisher=$2,
            platforms=$3
        WHERE
            id=$4
        RETURNING
            *
      `,
      [name, publisher, platforms, id]
    );
    return new Game(rows[0]);
  }
};
