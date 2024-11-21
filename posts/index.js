import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import { randomBytes } from "crypto";

const app = express();
app.use(cors());
app.use(bodyParser.json());
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/posts",async (req, res) => {
  try {
    

//   const id = randomBytes(4).toString("hex");

const arrFromObj = Object.keys(posts);

const id=arrFromObj.length +1
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };
 await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: { id, title },
  });
  res.status(201).send(posts[id]);
} catch (error) {
    console.log(error);
    
}
});

app.post("/events",async (req, res) => {
    console.log('Event Received',req.body.type)
    res.send({})
})

app.listen(4000, () => {
  console.log("server started @ 4000");
});
