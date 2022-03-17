const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a book', async () => {
    const expected = {
      name: "An Absolutely Remarkable Thing",
      author: "Hank Green",
      published: 2018
    };

    const res = await (await request(app).post('api/v1/books')).setEncoding(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
}); 
