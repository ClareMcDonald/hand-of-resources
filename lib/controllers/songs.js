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
  });
