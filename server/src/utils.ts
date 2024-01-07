import jwt from "jsonwebtoken";
require("dotenv").config();

export function generateToken(pushSubscription: PushSubscription) {
  const payload = {
    aud: pushSubscription.endpoint,
    exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60,
    sub: "mailto:alex.martos@hotmail.se",
  };

  return jwt.sign(JSON.stringify(payload), process.env.VAPID_PRIVATE!);
}

export async function pushToService(subscription: PushSubscription) {
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
