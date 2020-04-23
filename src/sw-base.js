if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  );
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);

    workbox.routing.registerRoute(
      /.*(?:googleapis|gstatic)\.com.*$/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts'
      })
    );

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg)$/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'images'
      })
    );

    /* *****************************************************************  */
    /*                        PUSH NOTIFICATIONS                          */
    /* *****************************************************************  */
    self.addEventListener('notificationclick', function(event) {
      var notification = event.notification;
      var action = event.action;

      console.log(notification);

      if (action === 'confirm') {
        console.log('Confirm was chosen');
        notification.close();
      } else {
        console.log(action);
        event.waitUntil(
          clients
            .matchAll()
            .then(function(clis) {
              var client = clis.find(function(c) {
                return c.visibilityState === 'visible';
              });

              if (client !== undefined) {
                client.navigate(notification.data.url);
                client.focus();
              } else {
                clients.openWindow(notification.data.url);
              }
              notification.close();
            })
            .catch(e => console.log(e))
        );
      }
    });

    self.addEventListener('notificationclose', function(event) {
      console.log('Notification was closed', event);
    });

    self.addEventListener('push', function(event) {
      console.log('Push Notification received', event);

      var data = {
        title: 'New!',
        content: 'Появилось что-то новинькое!',
        openUrl: '/'
      };

      if (event.data) {
        data = JSON.parse(event.data.text());
      }

      var options = {
        body: data.content,
        icon: './logoSizes/Logo-96x96.png',
        badge: './logoSizes/Badge-96x96.png',
        vibrate: [100, 50, 200],
        data: {
          url: data.openUrl
        }
      };

      event.waitUntil(self.registration.showNotification(data.title, options));
    });
  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}
