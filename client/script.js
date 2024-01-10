const subscribeBtn = document.getElementById("subscribeBtn");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

subscribeBtn.addEventListener("click", askForPermisson);
sendButton.addEventListener("click", sendMessage);

async function askForPermisson() {
  const SW = await navigator.serviceWorker.getRegistration();

  if (!SW) {
    console.log("No service worker registered");
    return;
  }

  console.log("Checking if has current subscription");
  const currentSubscription = await SW.pushManager.getSubscription();

  if (currentSubscription) {
    console.log("Has current subscription");
    return;
  }

  console.log("Asking for permission...");
  const permission = await Notification.requestPermission();
  console.log(permission);

  if (permission === "granted") {
    const vapid = await getPublicVAPIDKey();

    console.log("Subscribing...");
    console.log(vapid.public_key);
    const subscription = await SW.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapid.public_key,
    });

    console.log("New pushsubscription => ", subscription);
    await subscribe(subscription);

    console.log("Subscribed");
  }
}

async function getPublicVAPIDKey() {
  const res = await fetch("http://localhost:8080/vapid");

  return await res.json();
}

async function subscribe(pushSubscription) {
  await fetch("http://localhost:8080/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pushSubscription),
  });
}

function sendMessage() {
  const message = messageInput.value;

  console.log("Sending message => " + message);

  fetch("http://localhost:8080/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
    }),
  });
}

async function registerSW() {
  if (!("PushManager" in window)) {
    console.log("PushManager is not supported");
    return;
  }

  if (!("serviceWorker" in window.navigator)) {
    console.log("serviceWorker is not supported");
    return;
  }
  try {
    const sw = await navigator.serviceWorker.register("./serviceWorker.js", {
      scope: "/client/",
    });
    console.log("SW registered");
  } catch (err) {
    console.log("Could not register service worker", err);
  }
}

registerSW();
