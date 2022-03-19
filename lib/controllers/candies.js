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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const candy = await Candy.findById(req.params.id);
      res.send(candy);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const candy = await Candy.updateById(req.params.id, req.body);
    res.send(candy);
  })

  .delete('/:id', async (req, res) => {
    const candy = await Candy.deleteById(req.params.id);
    res.send(candy);
  });
