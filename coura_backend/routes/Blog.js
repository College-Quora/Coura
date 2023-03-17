const express = require("express");
const router = express.Router();

const blogDB = require("../models/Blog");
const userDB = require("../models/User");

router.post("/", async (req, res) => {
  try {
    await blogDB
      .create({
        blogName: req.body.blogName,
        blogUrl: req.body.blogUrl,
        createdAt: Date.now(),
        blogUpvotes: 0,
        blogDownvotes: 0,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Blog added successfully!",
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: false,
          message: "Bad request!",
        });
      });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Error while adding blog!",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    await blogDB
      .aggregate([
        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "blogId",
            as: "allComments",
          },
        },
      ])
      .exec()
      .then((doc) => {
        res.status(200).send(doc);
      })
      .catch((err) => {
        res.status(400).send({
          status: false,
          message: "Unable to get the blog details!",
        });
      });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Unexpected error!",
    });
  }
});

router.post("/upvotes", async (req, res) => {
  const postId = req.body.postId;
  const userId = req.body.userId;

  //   console.log(`upvote ${postId}`);
  try {
    const user = await userDB.findById(userId).exec();
    const blog = await blogDB.findById(postId).exec();
    const choice = user.votes.get(postId);
    var message = "";

    // console.log(user.email);
    // console.log(choice);

    if (choice === undefined || choice === 0) {
      blog.blogUpvotes += 1;
      user.votes.set(postId, 1);
      message = "Blog Upvoted";
    } else if (choice == -1) {
      blog.blogDownvotes -= 1;
      blog.blogUpvotes += 1;
      user.votes.set(postId, 1);
      message = "Blog Upvoted";
    } else if (choice == 1) {
      //   console.log(`choice ${choice}`);
      blog.blogUpvotes -= 1;
      user.votes.set(postId, 0);
      message = "vote removed";
    }

    await user.save();
    await blog.save();

    res.status(200).send({
      status: true,
      message: message,
      upvotes: blog.blogUpvotes,
      downvotes: blog.blogDownvotes,
      choice: user.votes.get(postId),
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Error while upvoting blog!",
      upvotes: blog.blogUpvotes,
      downvotes: blog.blogDownvotes,
    });
  }
});

router.post("/downvotes", async (req, res) => {
  const postId = req.body.postId;
  const userId = req.body.userId;

  //   console.log(`downvote ${postId}`);
  try {
    const user = await userDB.findById(userId).exec();
    const blog = await blogDB.findById(postId).exec();
    const choice = user.votes.get(postId);
    var message = "";

    if (choice === undefined || choice === 0) {
      blog.blogDownvotes += 1;
      user.votes.set(postId, -1);
      message = "Blog Downvoted";
    } else if (choice == 1) {
      blog.blogDownvotes += 1;
      blog.blogUpvotes -= 1;
      user.votes.set(postId, -1);

      message = "Blog Downvoted";
    } else if (choice == -1) {
      user.votes.set(postId, 0);
      blog.blogDownvotes -= 1;
      message = "vote removed";
    }

    await blog.save();
    await user.save();

    res.status(200).send({
      status: true,
      message: "Blog Downvoted",
      upvotes: blog.blogUpvotes,
      downvotes: blog.blogDownvotes,
      choice: user.votes.get(postId),
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Error while downvoting blog!",
      upvotes: blog.blogUpvotes,
      downvotes: blog.blogDownvotes,
    });
  }
});

module.exports = router;