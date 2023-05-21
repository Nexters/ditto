import { saveToken } from '@/lib/supabase/apis/fcm';
import { useUser } from '@/store/useUser';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, Messaging, onMessage } from 'firebase/messaging';
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
    const messaging = getMessaging(app);

    Notification.requestPermission()
      .then((permission) => {
        if (permission !== 'granted') return;

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
      const title = payload?.notification?.title ?? '';
      const body = payload?.notification?.body;
      const icon = payload.notification?.icon;

      const notification = new Notification(title, { body, icon });
      notification.onclick = () => {
        window.focus();
      };
    });
    return () => unsubscribe();
  }, [messaging]);

  // @note: 다른 곳에서도 사용할 수 있게 return한다.
  return { messaging };
};
