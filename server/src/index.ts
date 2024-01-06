import express from "express";
import cors from "cors";
import { getAllSubscriptions, saveSubscription } from "./db";
import jwt from "jsonwebtoken";

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

function generateToken(pushSubscription: PushSubscription) {
  const payload = {
    aud: pushSubscription.endpoint,
    exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60,
    sub: "mailto:alex.martos@hotmail.se",
  };

  return jwt.sign(JSON.stringify(payload), process.env.VAPID_PRIVATE!);
}

async function pushToService(subscription: PushSubscription) {
  const token = generateToken(subscription);

  try {
    const response = await fetch(subscription.endpoint, {
      method: "POST",
      headers: {
        Authorization: `WebPush ${token}`,
        "Crypto-Key": `p256ecdsa=${Buffer.from(
          process.env.VAPID_PUBLIC!
        ).toString("base64")}`,
      },
    });

    const body = await response.text();

    console.log(body);
  } catch (err) {
    console.log("Error while pushing");

    console.log(err);
  }
}
