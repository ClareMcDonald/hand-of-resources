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
  });
