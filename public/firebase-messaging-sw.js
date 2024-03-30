importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyA5T92gOELxU6rUHyfT-dOaLUQKDUuiqhk",
  authDomain: "learning-df2ab.firebaseapp.com",
  databaseURL: "https://learning-df2ab-default-rtdb.firebaseio.com",
  projectId: "learning-df2ab",
  storageBucket: "learning-df2ab.appspot.com",
  messagingSenderId: "794627043443",
  appId: "1:794627043443:web:cf370ae8f1a52dbbd03a06"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
