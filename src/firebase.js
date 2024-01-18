import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBpiOut0R84amx-Hz8Nh-uoeruAXBNkIHA",
    authDomain: "basiclogintoapp.firebaseapp.com",
    databaseURL: "https://basiclogintoapp-default-rtdb.firebaseio.com",
    projectId: "basiclogintoapp",
    storageBucket: "basiclogintoapp.appspot.com",
    messagingSenderId: "588108613584",
    appId: "1:588108613584:web:5075f35ad091c4255e9bd5",
    measurementId: "G-7T3MCNDX7E"
  };
  

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const imageDb=getStorage(app)
export default app;