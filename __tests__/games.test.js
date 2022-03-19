const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Game = require('../lib/models/Game');

describe('game routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
    
  afterAll(() => {
    pool.end();
  });
    
  it('creates a game', async () => {
    const expected = {
      name: 'Animal Crossing',
      publisher: 'Nintendo',
      platforms: ['Nintendo 64', 'iQue Player', 'GameCubeWiiWii', 'UNintendo DSNintendo', '3DS', 'iOS', 'Android', 'Nintendo Switch']
    };
    const res = await request(app).post('/api/v1/games').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
    
  it('gets a list of games', async () => {
    const expected = await Game.findAll();
    const res = await request(app).get('/api/v1/games');

    expect(res.body).toEqual(expected);
  });
    
  it('gets a game by id', async () => {
    const song = {
      name: 'Animal Crossing',
      publisher: 'Nintendo',
      platforms: ['Nintendo 64', 'iQue Player', 'GameCubeWiiWii', 'UNintendo DSNintendo', '3DS', 'iOS', 'Android', 'Nintendo Switch']
    };
    const returnedSong = await request(app).post('/api/v1/games').send(song);
    const res = await request(app).get(`/api/v1/games/${returnedSong.body.id}`);

    expect(res.body).toEqual({ id: expect.any(String), ...returnedSong.body });
  });
});
