const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  author;
  published;
    
  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.author = row.author;
    this.published = row.published;
  }
    
  static async insert({ title, author, published }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            books (title, author, published)
        VALUES
            ($1, $2, $3)
        RETURNING
            *
     `,
      [title, author, published]
    );
    return new Book(rows[0]);
  }
    
  static async findAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        books
    `
    );
    return rows.map((row) => new Book(row));
  }
    
  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            books
        WHERE
            id=$1
          `,
      [id]
    );
    return new Book(rows[0]);
  }
  
  static async updateById(id, attributes) {
    const existingBook = await Book.findById(id);
    const updatedAttributes = { ...existingBook, ...attributes };
    const { title, author, published } = updatedAttributes;
    const { rows } = await pool.query(
      `
        UPDATE
            books
        SET
            title=$1,
            author=$2,
            published=$3
        WHERE
            id=$4
        RETURNING
            *
      `,
      [title, author, published, id]
    );
    return new Book(rows[0]);
  } 
    
  static async deleteById(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM
            books
        WHERE
            id=$1
        RETURNING
            *
          `,
      [id]
    );
    return new Book(rows[0]);
  }
};
