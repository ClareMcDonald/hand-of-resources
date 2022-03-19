const { Router } = require('express');
const Song = require('../models/Song');

module.exports = Router()
  .post('/', async (req, res) => {
    const song = await Song.insert(req.body);
    res.send(song);
  })

  .get('/', async (req, res) => {
    const songs = await Song.findAll();
    res.send(songs);
  })
  
  .get('/:id', async (req, res, next) => {
    try {
      const song = await Song.findById(req.params.id);
      res.send(song);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
