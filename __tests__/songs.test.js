const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Song = require('../lib/models/Song');

describe('song routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
    
  it('creates a song', async () => {
    const expected = {
      name: 'King',
      artist: 'Florence + the Machine',
      released: 2022
    };
      
    const res = await request(app).post('/api/v1/songs').send(expected);
      
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
    
  it('gets a list of songs', async () => {
    const expected = await Song.findAll();
    const res = await request(app).get('/api/v1/songs');
      
    expect(res.body).toEqual(expected);
  });
    
  it('gets a song by id', async () => {
    const song = {
      name: 'King',
      artist: 'Florence + the Machine',
      released: 2022
    };
    const returnedSong = await request(app).post('/api/v1/songs/').send(song); 
    const res = await request(app).get(`/api/v1/songs/${returnedSong.body.id}`);

    expect(res.body).toEqual({ id: expect.any(String), ...returnedSong.body });
  });
    
  it('updates a song by id', async () => {
    const song = await Song.insert({
      name: 'King',
      artist: 'Florence + the Machine',
      released: 2022
    });
      
    const res = await request(app)
      .patch(`/api/v1/songs/${song.id}`)
      .send({ released: 2023 });
      
    const expected = { id: expect.any(String), ...song, released: 2023 };

    expect(res.body).toEqual(expected);
  });
    
  it('deletes a song by id', async () => {
    const song = await Song.insert({
      name: 'King',
      artist: 'Florence + the Machine',
      released: 2022
    });
      
    const expected = await Song.findById(song.id);
    const res = await request(app).delete(`/api/v1/songs/${expected.id}`);
      
    expect(res.body).toEqual(expected);
  });
});
