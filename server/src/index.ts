import express from "express";
import cors from "cors";
import { getAllSubscriptions, saveSubscription } from "./db";
import jwt from "jsonwebtoken";
import { pushToService } from "./utils";

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/subscribe", async (req, res) => {
  const body = req.body;
  console.log(body);

  await saveSubscription(body);

  res.end();
});

app.post("/send", async (req, res) => {
  const body = req.body;
  const message = body.message;

  const subscriptions = await getAllSubscriptions();

  for (let i = 0; i < subscriptions.length; i++) {
    await pushToService(subscriptions[i]);
  }

  res.end();
});

app.listen(8080, () => {
  console.log("Listening in port: " + 8080);
});
