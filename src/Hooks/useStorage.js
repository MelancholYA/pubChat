import { getDatabase, ref, set, onValue } from 'firebase/database';
import {
	getStorage,
	uploadBytes,
	getDownloadURL,
	ref as stRef,
} from 'firebase/storage';
import { useState } from 'react';
import { app } from '../firebase/config';

const useStorage = () => {
	const storage = getStorage(app);
	const [res, setRes] = useState({ status: 'uploading', res: null });
	const [url, setUrl] = useState(null);
	const [DBdata, setDBdata] = useState(null);

	const db = getDatabase(app);
	const writeData = async (field, data) => {
		await set(ref(db, field), data);
	};
	const readData = (field) => {
		const starCountRef = ref(db, field);
		onValue(starCountRef, async (snapshot) => {
			const data = await snapshot.val();
			console.log(data);
			setDBdata(data);
		});
	};
	const uploadFile = async (file, path) => {
		const storageRef = stRef(storage, path);
		await uploadBytes(storageRef, file)
			.then((snapshot) => {
				console.log('Uploaded a blob or file!', snapshot);
				setRes({ status: 'uploaded', res: snapshot });
				getUrl(snapshot.metadata.fullPath);
			})
			.catch((error) => {
				console.log({ error, c: error.code });
				setRes({ status: 'error', res: error });
			});
	};
	const getUrl = (path) => {
		getDownloadURL(stRef(storage, path))
			.then((url) => {
				setUrl(url);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return { writeData, readData, uploadFile, res, url, getUrl, DBdata };
};

export default useStorage;
