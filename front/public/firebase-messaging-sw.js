importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "여기_너_API_KEY",
  authDomain: "너_authDomain",
  projectId: "너_projectId",
  messagingSenderId: "너_messagingSenderId",
  appId: "너_appId",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("백그라운드 푸시 수신", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});
