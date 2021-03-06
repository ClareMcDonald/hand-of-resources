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
    
  it('updates a game by id', async () => {
    const game = await Game.insert({
      name: 'Animal Crossing',
      publisher: 'Nintendo',
      platforms: ['Nintendo 64', 'iQue Player', 'GameCubeWiiWii', 'UNintendo DSNintendo', '3DS', 'iOS', 'Android', 'Nintendo Switch']
    });
      
    const res = await request(app)
      .patch(`/api/v1/games/${game.id}`)
      .send({ name: 'Animal Crossing :)' });
    
    const expected = { id: expect.any(String), ...game, name: 'Animal Crossing :)' };
    expect(res.body).toEqual(expected);
  });
    
  it('deletes a game by id', async () => {
    const game = await Game.insert({
      name: 'Animal Crossing',
      publisher: 'Nintendo',
      platforms: ['Nintendo 64', 'iQue Player', 'GameCubeWiiWii', 'UNintendo DSNintendo', '3DS', 'iOS', 'Android', 'Nintendo Switch']
    });
    
    const expected = await Game.findById(game.id);
    const res = await request(app).delete(`/api/v1/games/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
