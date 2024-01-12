import webpush, { PushSubscription, WebPushError } from "web-push";
import { deleteSubscription } from "./db";

require("dotenv").config();

type TMessage = {
  title: string;
  body: string;
  image?: string;
  actions?: {
    action: string;
    title: string;
  }[];
};

export async function pushToService(
  subscription: PushSubscription,
  message: TMessage
) {
  try {
    const response = await webpush.sendNotification(
      subscription,
      JSON.stringify(message),
      {
        vapidDetails: {
          privateKey: process.env.VAPID_PRIVATE!,
          publicKey: process.env.VAPID_PUBLIC!,
          subject: "mailto:someemail.com",
        },
      }
    );

    console.log(response);
  } catch (err: unknown) {
    console.log("Error while pushing");
    console.log(err);

    if (err instanceof WebPushError) {
      if (err.statusCode === 410) {
        await deleteSubscription(subscription);
      }
    }
  }
}
