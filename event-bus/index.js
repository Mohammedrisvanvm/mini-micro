import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors());
const events = [];
app.post("/events", (req, res) => {
  try {
    const event = req.body;
    console.log(event);
    events.push(event);
    axios.post("http://localhost:4000/events", event).catch((err) => {
      console.log(err.message);
    });
    axios.post("http://localhost:4001/events", event).catch((err) => {
      console.log(err.message);
    });
    axios.post("http://localhost:4002/events", event).catch((err) => {
      console.log(err.message);
    });
    axios.post("http://localhost:4003/events", event).catch((err) => {
      console.log(err.message);
    });
  } catch (error) {
    console.log(error.message);
  }
  res.send({ status: "OK" });
});
app.get("/events", (req, res) => {
  try {
    res.send(events);
  } catch (error) {
    console.log(error);
  }
});

app.listen(4005, () => {
  console.log("server started @ 4005");
});
