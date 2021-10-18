import { getDatabase, ref, set, onValue } from 'firebase/database';
import { app } from '../firebase/config';

const useStorage = () => {
	const db = getDatabase(app);
	const writeData = async (field, data) => {
		await set(ref(db, field), data);
	};

	const readData = (field) => {
		const starCountRef = ref(db, field);
		onValue(starCountRef, async (snapshot) => {
			const data = await snapshot.val();

			return data;
		});
	};

	return { writeData, readData };
};

export default useStorage;
