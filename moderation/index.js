import express from "express";
import bodyParser from "body-parser";
// import cors from "cors";
import axios from "axios";
import { randomBytes } from "crypto";
import { log } from "console";

const app = express();
// app.use(cors());
app.use(bodyParser.json());
const posts = {};

app.get("/event", (req, res) => {
  res.send(posts);
});


app.post("/events", async (req, res) => {
  try {
    console.log("Event Received", req.body.type);
    const { type, data } = req.body;
    if (type === "CommentCreated") {
      const status = data.content.includes("red") ? "rejected" : "approved";
      console.log(status);
      
      await axios.post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: {
          id: data.id,
          postId: data.postId,
          content: data.content,
          status,
        },
      });
    }
    res.send({});
  } catch (error) {
    console.log(error);
  }
});

app.listen(4003, () => {
  console.log("server started @ 4003");
});
