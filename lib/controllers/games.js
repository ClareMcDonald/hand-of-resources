const { Router } = require('express');
const Game = require('../models/Game');

module.exports = Router() 
  .post('/', async (req, res) => {
    const game = await Game.insert(req.body);
    res.send(game);
  });
