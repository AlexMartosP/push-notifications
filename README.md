# Web push notifications
This is me testing setting up push notifications on client and server.
I try keeping it as low level as possible and not intruducing libraries that do most of the work, to learn as much as possible.

**Web push**
The *bigger* library I am using is [web-push](https://github.com/web-push-libs/web-push) due to it's abstraction of the Web push protocol. All though I recommend reading about the protocol, here are som useful links:
- [Web push RFC](https://datatracker.ietf.org/doc/html/rfc8030)
- [Message encryption RFC](https://datatracker.ietf.org/doc/html/rfc8291)

I will go through the entire process, from permisson to sending push notifications and receiving in a service worker.

Feel free to check out how Push notifications work on both sides and I will try to keep the code as clean and minimal as possible.

### Resuorces (will add more)
I am currently looking through:
- [web.dev/explore/notifications](https://web.dev/explore/notifications)

### Contribution
Feel free to open up issues, questions (as issues), discussions (as issues) and pull-requests.