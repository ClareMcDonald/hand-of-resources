const songs = require('../controllers/songs');
const pool = require('../utils/pool');

module.exports = class Song {
  id;
  name;
  artist;
  ranking;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.artist = row.artist;
    this.released = row.released;
  }
    
  static async insert({ name, artist, released }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            songs (name, artist, released)
        VALUES
            ($1, $2, $3)
        RETURNING
            *
      `,
      [name, artist, released]
    );
    return new Song(rows[0]);
  }
};
