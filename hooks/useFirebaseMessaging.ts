import { saveToken } from '@/lib/supabase/apis/fcm';
import { useUser } from '@/store/useUser';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, Messaging, onMessage, isSupported } from 'firebase/messaging';
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyBkzqkw7zYgtHsbe9ESBdn_WZrxJG4jfLo',
  projectId: 'ditto-ff8fb',
  messagingSenderId: '100767297550',
  appId: '1:100767297550:web:9c00cb618b6382d4a3cc5f',
};

/**
 * 1. 사용자로부터 notification 권한을 요청하고
 * 2. 권한이 존재하면 웹 푸시를 위한 token을 발급한다.
 * 3. 발급 받은 token을 user id와 함께 서버에 저장한다.
 */
export const useFirebaseMessaging = () => {
  const { user } = useUser();
  const [messaging, setMessaging] = useState<Messaging>();

  // @note: 로그인 되어있을 때부터 firebase 초기화를 진행한다.
  // notification 권한이 없는 경우 나머지 effect는 진행되지 않는다.
  useEffect(() => {
    if (!user) return;

    const app = initializeApp(firebaseConfig);

    isSupported()
      .then((supported) => {
        if (!supported) throw 'not supported firebase messaging';
        return Notification.requestPermission();
      })
      .then((permission) => {
        if (permission !== 'granted') return;

        const messaging = getMessaging(app);
        setMessaging(messaging);
      })
      .catch(console.error);
  }, [user]);

  // @note: firebase를 통해 얻은 토큰을 서버에 저장한다.
  useEffect(() => {
    if (!user || !messaging) return;

    const vapidKey = process.env.NEXT_PUBLIC_VAPID_KEY as string;

    // Get registration token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    getToken(messaging, { vapidKey })
      .then((token) => {
        // Show permission request UI
        if (!token) {
          console.log('No registration token available. Request permission to generate one.');
          return;
        }

        // Send the token to your server and update the UI if necessary
        // ...
        return saveToken(user.id, token);
      })
      .catch((error) => {
        // @todo: 알림을 받을 수 없다는 식의 내용을 UI로 표현할 것
        console.log('An error occurred while retrieving token. ', error);
      });
  }, [messaging, user]);

  // @note: foreground일 때 알림이 오면 notification 표시하도록 한다.
  useEffect(() => {
    if (!messaging) return;

    const unsubscribe = onMessage(messaging, (payload) => {
      const title = payload.notification?.title ?? '';
      const body = payload.notification?.body;
      const icon = payload.notification?.icon;

      // @hack: onNotificationClick 핸들러를 그대로 사용하고자 data에 FCM_MSG를 넣어 internal payload처럼 처리되도록 한다.
      // ref: https://github.com/firebase/firebase-js-sdk/blob/713363d3088f8d11ac2a08beaaeca0b4a7a40003/packages/messaging/src/listeners/sw-listeners.ts#L113-L125
      const data = { FCM_MSG: payload };

      // @note: mobile에선 notification 생성자 함수를 지원하지 않아 serviceWorker 사용
      // https://stackoverflow.com/questions/31512504/html5-notification-not-working-in-mobile-chrome
      navigator.serviceWorker.ready
        .then(() => navigator.serviceWorker.getRegistrations())
        .then((registrations) => {
          // @note: 현재 2개의 sw가 있기 때문에, 그 중 firebase sw를 찾아서 notification을 띄워야
          // firebase-message-sw.js 의 onNotificationClick 핸들러를 이용할 수 있다.
          const registration = registrations.find((reg) => reg.active?.scriptURL.includes('firebase-messaging-sw.js'));
          registration?.showNotification(title, { body, icon, data });
        });
    });
    return () => unsubscribe();
  }, [messaging]);

  // @note: 다른 곳에서도 사용할 수 있게 return한다.
  return { messaging };
};
