    importScripts(
      'https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js'
    )
    importScripts(
      'https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js'
    )
    firebase.initializeApp({"apiKey":"AIzaSyBix73HHrvFUo_IwLvWeMEaihY4e3t9yS8","authDomain":"notificationapp-e6a25.firebaseapp.com","projectId":"notificationapp-e6a25","storageBucket":"notificationapp-e6a25.appspot.com","messagingSenderId":"616570992430","appId":"1:616570992430:web:7d95ef1047e8cb5e07acbf","measurementId":"G-RZVWZWMKFH"})

    // Retrieve an instance of Firebase Messaging so that it can handle background
    // messages.
    const messaging = firebase.messaging()

    self.addEventListener('push', function (e) {
    data = e.data.json();
    var options = {
    body: data.notification.body,
    icon: data.notification.icon,
    vibrate: [100, 50, 100],
    data: {
    dateOfArrival: Date.now(),
    primaryKey: '2'
    },
    };
    self.registration.hideNotification();
    self.registration.showNotification(data.notification.title, options);
    });

    self.addEventListener('notificationclick', function(event) {
        event.notification.close();
        const url = 'http://localhost:3000/chats';
        event.waitUntil(
            self.clients.matchAll({type: 'window'}).then( windowClients => {
                // Check if there is already a window/tab open with the target URL
                for (var i = 0; i < windowClients.length; i++) {
                    var client = windowClients[i];
                    // If so, just focus it.
                    if (client.url === url && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (self.clients.openWindow) {
                    console.log("open window")
                }
            })
        )
      }, false);
    