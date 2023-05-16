import { saveToken } from '@/lib/supabase/apis/fcm';
import { useUser } from '@/store/useUser';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { useEffect } from 'react';

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

  useEffect(() => {
    // @note: 로그인 되어있을 때부터 로직을 진행한다
    if (!user) return;

    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
    const vapidKey = process.env.NEXT_PUBLIC_VAPID_KEY as string;

    (async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') return;

        // Get registration token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        const token = await getToken(messaging, { vapidKey });

        // Show permission request UI
        if (!token) {
          console.log('No registration token available. Request permission to generate one.');
          return;
        }

        // Send the token to your server and update the UI if necessary
        // ...
        await saveToken(user.id, token);
      } catch (error) {
        // @todo: 알림을 받을 수 없다는 식의 내용을 UI로 표현할 것
        console.log('An error occurred while retrieving token. ', error);
      }
    })();
  }, [user]);
};
