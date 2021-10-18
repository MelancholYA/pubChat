import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyDsfiOB0CVLEy8xSR35ppXVAh1I0G9G8Zc',
	authDomain: 'joblist-1c14c.firebaseapp.com',
	projectId: 'joblist-1c14c',
	storageBucket: 'joblist-1c14c.appspot.com',
	messagingSenderId: '144924822491',
	appId: '1:144924822491:web:b333a7a66ab422cd0635fe',
	databaseURL:
		'https://joblist-1c14c-default-rtdb.europe-west1.firebasedatabase.app',
};
const app = initializeApp(firebaseConfig);

export { app };
