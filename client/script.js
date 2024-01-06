const subscribeBtn = document.getElementById("subscribeBtn");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

subscribeBtn.addEventListener("click", askForPermisson);
sendButton.addEventListener("click", sendMessage);

async function askForPermisson() {
  console.log("Asking for permission...");
  const permission = await Notification.requestPermission();
  console.log(permission);
}

async function subscribe(pushSubscription) {
  fetch("http://localhost:8080/subscribe", {
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

    const permissionState = await sw.pushManager.permissionState({
      userVisibleOnly: true,
    });
    console.log("Push permission state => " + permissionState);

    const pushSubscription = await sw.pushManager.getSubscription();

    console.log("Pushsubscription => ", pushSubscription);

    if (!pushSubscription) {
      console.log("Subscribing...");
      const newPushSubscription = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:
          "BAwratwmIKW_nPDQY2gDJTo3SsvUPXFSOeQROh4X5DeGfiESXrz0odqGHCfVH_qkipQzaRn2oVkmYnsmBNMCDqo",
      });

      console.log("New pushsubscription => ", newPushSubscription);
      subscribe(newPushSubscription);
    }
  } catch (err) {
    console.log("Could not register service worker", err);
  }
}

registerSW();
