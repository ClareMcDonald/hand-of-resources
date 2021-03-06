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

  it('gets a list of candies', async () => {
    const expected = await Candy.findAll();

    const res = await request(app).get('/api/v1/candies');

    expect(res.body).toEqual(expected);
  });
    
  it('gets a candy by id', async () => {
    const candy = {
      name: 'Reeses',
      manufacturer: 'The Hershey Company',
      ranking: 10
    };
    const returnedCandy = await request(app).post('/api/v1/candies').send(candy);
    const res = await request(app).get(`/api/v1/candies/${returnedCandy.body.id}`);

    expect(res.body).toEqual({ id: expect.any(String), ...returnedCandy.body });
  });
    
  it('updates a candy by id', async () => {
    const candy = await Candy.insert({
      name: 'Reeses',
      manufacturer: 'The Hershey Company',
      ranking: 10
    });
    
    const res = await request(app)
      .patch(`/api/v1/candies/${candy.id}`)
      .send({ ranking: 11 });
    
    const expected = { id: expect.any(String), ...candy, ranking: 11 };

    expect(res.body).toEqual(expected);
  });
    
  it('deletes a candy by id', async () => {
    const candy = await Candy.insert({
      name: 'Reeses',
      manufacturer: 'The Hershey Company',
      ranking: 10
    });
   
    const expected = await Candy.findById(candy.id);
    const res = await request(app).delete(`/api/v1/candies/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
