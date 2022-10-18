import { getApp, initializeApp, getApps } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA2imL3-dm_gAjHLLy0UMXGcGXwIBfvSzQ',
  authDomain: 'mycamper-634d8.firebaseapp.com',
  projectId: 'mycamper-634d8',
  storageBucket: 'mycamper-634d8.appspot.com',
  messagingSenderId: '161237992175',
  appId: '1:161237992175:web:8dd205cb2b46b799d7111a',
  measurementId: 'G-KW0NP32NQQ',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
// const analytics = getAnalytics(app);
const auth = getAuth();

export default app;
export { auth, db };
