importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyB7GPu9vQL0VxeJllUUFu2-ATf2HruhBqE",
  authDomain: "awoo-2c8de.firebaseapp.com",
  projectId: "awoo-2c8de",
  messagingSenderId: "127681937004",
  appId: "1:127681937004:web:1e4f9c45486abba974e249",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("백그라운드 푸시 수신", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});
