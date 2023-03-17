const express = require("express");
const router = express.Router();

const questionDB = require("../models/Question");
const userDB = require("../models/User");

router.post("/", async (req, res) => {
  try {
    await questionDB
      .create({
        questionName: req.body.questionName,
        questionUrl: req.body.questionUrl,
        createdAt: Date.now(),
        quesUserId: req.body.userId,
        quesUpvotes: 0,
        quesDownvotes: 0,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Question added successfully!",
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
      message: "Error while adding question!",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    await questionDB
      .aggregate([
        {
          $lookup: {
            from: "answers",
            localField: "_id",
            foreignField: "questionId",
            as: "allAnswers",
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
          message: "Unable to get the question details!",
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
    const ques = await questionDB.findById(postId).exec();
    const choice = user.votes.get(postId);
    var message = "";

    // console.log(user.email);
    // console.log(choice);

    if (choice === undefined || choice === 0) {
      ques.quesUpvotes += 1;
      user.votes.set(postId, 1);
      message = "Question Upvoted";
    } else if (choice == -1) {
      ques.quesDownvotes -= 1;
      ques.quesUpvotes += 1;
      user.votes.set(postId, 1);
      message = "Question Upvoted";
    } else if (choice == 1) {
    //   console.log(`choice ${choice}`);
      ques.quesUpvotes -= 1;
      user.votes.set(postId, 0)
      message = "vote removed";
    }

    await user.save();
    await ques.save();

    res.status(200).send({
      status: true,
      message: message,
      upvotes: ques.quesUpvotes,
      downvotes: ques.quesDownvotes,
      choice: user.votes.get(postId)
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Error while upvoting question!",
      upvotes: ques.quesUpvotes,
      downvotes: ques.quesDownvotes,
    });
  }
});

router.post("/downvotes", async (req, res) => {
  const postId = req.body.postId;
  const userId = req.body.userId;

//   console.log(`downvote ${postId}`);
  try {
    const user = await userDB.findById(userId).exec();
    const ques = await questionDB.findById(postId).exec();
    const choice = user.votes.get(postId);
    var message = "";

    if (choice === undefined || choice === 0) {
      ques.quesDownvotes += 1;
      user.votes.set(postId, -1);
      message = "Question Downvoted";
    } else if (choice == 1) {
      ques.quesDownvotes += 1;
      ques.quesUpvotes -= 1;
      user.votes.set(postId, -1);

      message = "Question Downvoted";
    } else if (choice == -1) {
      user.votes.set(postId, 0)
      ques.quesDownvotes -= 1;
      message = "vote removed";
    }

    await ques.save();
    await user.save();

    res.status(200).send({
      status: true,
      message: "Question Downvoted",
      upvotes: ques.quesUpvotes,
      downvotes: ques.quesDownvotes,
      choice: user.votes.get(postId)
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Error while downvoting question!",
      upvotes: ques.quesUpvotes,
      downvotes: ques.quesDownvotes,
    });
  }
});

router.post("/votes", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await userDB.findById(userId).exec();
    var votes = user.votes;

    res.status(200).send({
      status: true,
      message: "Returning user votes",
      votes: votes,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Error while fetching votes of user",
    });
  }
});

module.exports = router;
