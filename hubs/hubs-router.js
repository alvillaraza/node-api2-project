const express = require('express');
const Data = require('../data/db.js');

const router = express.Router();

router.post('/', (req, res) => {
  Data.add(req.body)
    .then(eachData => {
      res.status(201).json(eachData);
    })
    .catch(error => {
    res.status(500).json({
      message: "Error adding the post"
    });
  })
})

module.exports = router;