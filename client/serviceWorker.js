self.addEventListener("push", (event) => {
  const text = event.data.text();

  event.waitUntil(self.registration.showNotification(text));
});
