function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  // eslint-disable-next-line
  var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);
  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function displayConfirmNotification() {
  if ('serviceWorker' in navigator) {
    var options = {
      body:
        'Уведомления о новых рандомах включены! 👌️ Теперь ты будешь одним из первых, кто узнает об этом 😉️',
      icon: './logoSizes/Logo-96x96.png',
      dir: 'ltr',
      lang: 'ru',
      vibrate: [100, 50, 200],
      badge: './logoSizes/Badge-96x96.png'
    };

    navigator.serviceWorker.ready
      .then(function(swreg) {
        swreg.showNotification('Уведомления включены!', options);
      })
      .catch(e => console.log(e));
  }
}

function configurePushSub() {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  var reg;
  navigator.serviceWorker.ready
    .then(function(swreg) {
      reg = swreg;
      return swreg.pushManager.getSubscription();
    })
    .then(function(sub) {
      if (sub === null) {
        // Create a new subscription
        var vapidPublicKey =
          'BNIlu2SmClN5ZWGgSaFKHasGjEXs6-S0WYhTqJZG-LXqkKRo2nCqfaylCe6m6XWwV5U8hdUZbmhPwfpVGOC4WLo';
        var convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
        return reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidPublicKey
        });
      } else {
        // We have a subscription
      }
    })
    .then(function(newSub) {
      return fetch(
        atob(
          'aHR0cHM6Ly9yYW5kb211c2FwcC5maXJlYmFzZWlvLmNvbS9zdWJzY3JpcHRpb25zLmpzb24='
        ),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(newSub)
        }
      );
    })
    .then(function(res) {
      if (res.ok) {
        displayConfirmNotification();
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}

export function askForNotificationPermission() {
  Notification.requestPermission(function(result) {
    console.log('User Choice', result);
    if (result !== 'granted') {
      console.log('No notification permission granted!');
    } else {
      configurePushSub();
    }
  });
}
