const movies = require('../controllers/movies');
const pool = require('../utils/pool');

module.exports = class Movie {
  id;
  title;
  director;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.director = row.director;
    this.released = row.released;
  }
    
  static async insert({ title, director, released }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            movies (title, director, released) 
        VALUES
            ($1, $2, $3)
        RETURNING 
            *
      `,
      [title, director, released]
    );
    return new Movie(rows[0]);
  }
};
