const express = require("express");
const Hubs = require("../data/db.js");

const router = express.Router();

//create post
router.post("/", (req, res) => {
  const { title, contents } = req.body;
  const userPost = req.body;

  Hubs.insert(userPost)
    .then(post => {
      if (!title || !contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post."
        });
      }
      res.status(201).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error adding the hub"
      });
    });
});

//create comment by post id
router.post("/:id/comments", (req, res) => {
  const { text, post_id } = req.body;
  const comment = req.body;
  const id = req.params.id;

  if (!text) {
    res.status(400).json({
      errorMessage: "Please provide text for the comment."
    });
  }

  if (post_id !== JSON.parse(id)) {
    res.status(404).json({
      message: "The post with the specified ID does not exist.",
      postID: post_id,
      id: id
    });
  }

  Hubs.insertComment(comment)
    .then(eachComment => {
      res.status(201).json(eachComment);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error adding the hub"
      });
    });
});

//get posts
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

//get post by id
router.get("/:id", (req, res) => {
  Hubs.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

//get comment by post id
router.get("/:id/comments", (req, res) => {
  Hubs.findPostComments(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the hub"
      });
    });
});

//deletes post by id
router.delete("/:id", (req, res) => {
  Hubs.remove(req.params.id)
    .then(count => {
      if (!count) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
      res.status(200).json(count); 
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error removing the hub",
        req: req.body
      });
    });
});

//update post
router.put("/:id", (req, res) => {
  const { title, contents } = req.body;
  const changes = req.body;

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }

  Hubs.update(req.params.id, changes)
    .then(updatePost => {
      if (updatePost) {
        res.status(200).json(updatePost);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be modified."
      });
    });
});

module.exports = router;
