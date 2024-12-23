import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import axios from "axios";

const app = express();
app.use(cors());
app.use(bodyParser.json());
const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];

    post.comments.push({ id, content, status });
  }
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});
//
app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  console.log("Event Received", req.body.type);
  console.log(posts);

  res.send({});
});

app.listen(4002, async () => {
  console.log("server started @ 4002");
  try {
    const res = await axios.get("http://localhost:4005/events");
 
    for (let event of res.data) {
      console.log("Processing event:", event.type);
 
      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});
