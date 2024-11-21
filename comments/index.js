import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import { randomBytes } from "crypto";
const app = express();
app.use(bodyParser.json());
app.use(cors());
const commentsByPostId = {};

app.get("/posts/:id/comments", async (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});
app.post("/posts/:id/comments", async (req, res) => {
  //   const commentId = randomBytes(4).toString("hex");
  //   const arrFromObj = Object.keys(posts);

  // const id=arrFromObj.length +1
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  const commentId = comments.length + 1;

  comments.push({ id: commentId, content, status: "pending" });

  commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});
app.post("/events", async (req, res) => {
  console.log("Event Received", req.body.type);
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        content,
        status,
      },
    });
  }
  res.send({});
});
app.listen(4001, () => {
  console.log("server started @ 4001");
});
