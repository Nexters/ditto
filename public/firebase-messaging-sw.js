// ref: https://firebase.google.com/docs/cloud-messaging/js/receive?hl=ko&authuser=0#handle_messages_when_your_web_app_is_in_the_foreground

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyBkzqkw7zYgtHsbe9ESBdn_WZrxJG4jfLo',
  projectId: 'ditto-ff8fb',
  messagingSenderId: '100767297550',
  appId: '1:100767297550:web:9c00cb618b6382d4a3cc5f',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
