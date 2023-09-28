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