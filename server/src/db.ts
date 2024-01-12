import { readFile, writeFile } from "fs/promises";
import { PushSubscription } from "web-push";

const path = "./db.json";

export async function saveSubscription(pushSubscription: PushSubscription) {
  const subscriptions = await getAllSubscriptions();

  subscriptions.push(pushSubscription);

  writeFile(path, JSON.stringify(subscriptions));
}

export async function getAllSubscriptions(): Promise<PushSubscription[]> {
  const subscriptions = await readFile(path, "utf-8");

  return JSON.parse(subscriptions);
}

export async function deleteSubscription(pushSubscription: PushSubscription) {
  const subscriptions = await getAllSubscriptions();

  const filteredSubscriptions = subscriptions.filter(
    (s) => s.endpoint !== pushSubscription.endpoint
  );

  writeFile(path, JSON.stringify(filteredSubscriptions));
}
