import webpush, { PushSubscription } from "web-push";

require("dotenv").config();

export async function pushToService(
  subscription: PushSubscription,
  message: string
) {
  try {
    const response = await webpush.sendNotification(subscription, message, {
      vapidDetails: {
        privateKey: process.env.VAPID_PRIVATE!,
        publicKey: process.env.VAPID_PUBLIC!,
        subject: "mailto:someemail.com",
      },
    });

    // const body = await response.text();

    // console.log(body);
  } catch (err) {
    console.log("Error while pushing");

    console.log(err);
  }
}
