import { readFile, writeFile } from "fs/promises";

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
