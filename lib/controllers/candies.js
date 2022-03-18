const { Router } = require('express');
const Candy = require('../models/Candy');

module.exports = Router() 
  .post('/', async (req, res) => {
    const candy = await Candy.insert(req.body);
    res.send(candy);
  })

  .get('/', async (req, res) => {
    const candies = await Candy.findAll();
    res.send(candies);
  });
