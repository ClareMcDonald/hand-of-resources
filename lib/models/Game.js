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
};
