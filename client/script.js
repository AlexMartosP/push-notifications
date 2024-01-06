const subscribeBtn = document.getElementById("subscribeBtn");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

subscribeBtn.addEventListener("click", subscribe);
sendButton.addEventListener("click", sendMessage);

async function subscribe() {
  console.log("Subscribing...");
  const permission = await Notification.requestPermission();
  console.log(permission);
}

function sendMessage() {}

function registerSW() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./serviceWorker.js", { scope: "/client/" })
      .then(() => {
        console.log("SW registered");
      });
  }
}

registerSW();
