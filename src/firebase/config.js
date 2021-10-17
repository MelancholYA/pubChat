import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
	apiKey: 'AIzaSyDsfiOB0CVLEy8xSR35ppXVAh1I0G9G8Zc',
	authDomain: 'joblist-1c14c.firebaseapp.com',
	projectId: 'joblist-1c14c',
	storageBucket: 'joblist-1c14c.appspot.com',
	messagingSenderId: '144924822491',
	appId: '1:144924822491:web:b333a7a66ab422cd0635fe',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };
