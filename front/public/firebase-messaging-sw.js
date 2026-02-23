importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

// Firebase 설정은 빌드 시 주입됩니다.
// .env 파일에 NEXT_PUBLIC_FIREBASE_* 환경변수를 설정하세요.
firebase.initializeApp({
  apiKey: self.__FIREBASE_CONFIG__?.apiKey || "",
  authDomain: self.__FIREBASE_CONFIG__?.authDomain || "",
  projectId: self.__FIREBASE_CONFIG__?.projectId || "",
  messagingSenderId: self.__FIREBASE_CONFIG__?.messagingSenderId || "",
  appId: self.__FIREBASE_CONFIG__?.appId || "",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("백그라운드 푸시 수신", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});
