self.addEventListener("push", (event) => {
  const message = event.data.json();

  event.waitUntil(
    self.registration.showNotification(message.title, {
      body: message.body,
      image: message.image,
      actions: message.actions,
    })
  );
});
