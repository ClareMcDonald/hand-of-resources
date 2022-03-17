const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Book = require('../lib/models/Book');

describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a book', async () => {
    const expected = {
      title: 'An Absolutely Remarkable Thing',
      author: 'Hank Green',
      published: 2018
    };

    const res = await request(app).post('/api/v1/books').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of books', async () => {
    const expected = await Book.findAll();
    const res = await request(app).get('/api/v1/books');

    expect(res.body).toEqual(expected);
  });

  it('gets a book by id', async () => {
    const book = {
      title: 'An Absolutely Remarkable Thing',
      author: 'Hank Green',
      published: 2018
    };
    const returnedBook = await request(app).post('/api/v1/books').send(book);
    const res = await request(app).get(`/api/v1/books/${returnedBook.body.id}`);

    expect(res.body).toEqual({ ...returnedBook.body });
  });
}); 
