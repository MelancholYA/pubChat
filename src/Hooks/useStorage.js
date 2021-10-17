import { useState } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { db } from '../firebase/config';

const useStorage = () => {
	const [data, setData] = useState({
		status: 'fetching',
		data: null,
	});
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const getData = async (collectionName) => {
		setData({ status: 'fetching' });
		const collectionData = collection(db, collectionName);
		const collectionSnap = await getDocs(collectionData);
		const data = collectionSnap.docs.map((doc) => doc.data());
		setData({
			status: 'fetched',
			data,
		});
	};
	const addData = async (collectionName, dataLoad) => {
		try {
			const docRef = await addDoc(collection(db, collectionName), dataLoad);
			setResponse(true);
			console.log(docRef.path);
		} catch (e) {
			console.error('Error adding document: ', e);
			setResponse(false);
			setError(e);
		}
	};
	return { data, response, error, getData, addData };
};

export default useStorage;
