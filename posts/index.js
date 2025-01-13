import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import { randomBytes } from "crypto";

const app = express();
const corsOptions = { origin: 'http://posts.com'}
app.use(cors(corsOptions));
app.use(bodyParser.json());
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create",async (req, res) => {
  try {
    

//   const id = randomBytes(4).toString("hex");

const arrFromObj = Object.keys(posts);

const id=arrFromObj.length +1
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };
 await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: { id, title },
  });
  res.status(201).send(posts[id]);
} catch (error) {
  res.status(200).send(error);
    
}
});

app.post("/events",async (req, res) => {
    console.log('Event Received',req.body.type)
    res.send({})
})

app.listen(4000, () => {
  console.log("server started @ 4000");
});
