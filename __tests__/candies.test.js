const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Candy = require('../lib/models/Candy');

describe('candy routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
    
  it('creates a candy', async () => {
    const expected = {
      name: 'Reeses',
      manufacturer: 'The Hershey Company',
      ranking: 10
    };
    //   const res = await request(app).post('/api/v1/candies').send(expected);
    const res = await request(app).post('/api/v1/candies').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
