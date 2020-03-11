const express = require('express');
const Hubs = require('../data/db.js');

const router = express.Router();
let posts = [];


router.get("/", (req, res) => {
  Hubs.find()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The posts information could not be retrieved." 
      });
    });
});

//post posts
router.post('/', (req, res) => {

});

module.exports = router;