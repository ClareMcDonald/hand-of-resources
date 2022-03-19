const { Router } = require('express');
const Game = require('../models/Game');

module.exports = Router() 
  .post('/', async (req, res) => {
    const game = await Game.insert(req.body);
    res.send(game);
  })
    
  .get('/', async (req, res) => {
    const games = await Game.findAll();
    res.send(games);
  })
    
  .get('/:id', async (req, res, next) => {
    try {
      const game = await Game.findById(req.params.id);
      res.send(game);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
