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
    
  static async findAll() {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            songs
      `
    );
    return rows.map((row) => new Song(row));
  }
    
  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            songs
        WHERE
            id=$1
      `,
      [id]
    );
    return new Song(rows[0]);
  }
    
  static async updateById(id, attributes) {
    const existingSong = await Song.findById(id);
    const updatedAttributes = { ...existingSong, ...attributes };
    const { name, artist, released } = updatedAttributes;
    const { rows } = await pool.query(
      `
        UPDATE
            songs
        SET
            name=$1,
            artist=$2,
            released=$3
        WHERE
            id=$4
        RETURNING
            *
      `,
      [name, artist, released, id]
    );
    return new Song(rows[0]);
  }
    
  static async deleteById(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM
            songs
        WHERE 
            id=$1
        RETURNING
            *
      `,
      [id]
    );
    return new Song(rows[0]);
  }
};
