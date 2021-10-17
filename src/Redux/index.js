import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './Reducers/filters';

export default configureStore({
	reducer: {
		filter: filterReducer,
	},
});
