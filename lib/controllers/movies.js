const { Router } = require('express');
const Movie = require('../models/Movie');

module.exports = Router()
  .post('/', async (req, res) => {
    const movie = await Movie.insert(req.body);
    res.send(movie);
  })

  .get('/', async (req, res) => {
    const movies = await Movie.findAll();
    res.send(movies);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const movie = await Movie.findById(req.params.id);
      res.send(movie);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });


