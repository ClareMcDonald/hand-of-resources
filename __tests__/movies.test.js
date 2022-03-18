const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Movie = require('../lib/models/Movie');

describe('movie routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
    
  afterAll(() => {
    pool.end();
  });

  it('creates a movie', async () => {
    const expected = {
      title: 'Little Miss Sunshine',
      director: '	Jonathan Dayton and Valerie Faris',
      released: 2006
    };

    const res = await request(app).post('/api/v1/movies').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
    
  it('gets a list of movies', async () => {
    const expected = await Movie.findAll();
    const res = await request(app).get('/api/v1/movies');

    expect(res.body).toEqual(expected);
  });
    
  it('gets a movie by id', async () => {
    const movie = {
      title: 'Little Miss Sunshine',
      director: 'Jonathan Dayton and Valerie Faris',
      released: 2006
    };
    const returnedMovie = await request(app).post('/api/v1/movies').send(movie);
    const res = await request(app).get(`/api/v1/movies/${returnedMovie.body.id}`);

    expect(res.body).toEqual({ ...returnedMovie.body });
  });
});
