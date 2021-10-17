import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
	name: 'filtersReducer',
	initialState: {
		show: false,
		roles: [],
		levels: [],
		languages: [],
		tools: [],
	},
	reducers: {
		toggle: (state) => {
			state.show = !state.show;
		},
		filterAction: (state, action) => {
			const filterType = action.payload.case;
			switch (filterType) {
				case 'roles':
					state.roles = action.payload.data;
					break;
				case 'levels':
					state.levels = action.payload.data;
					break;
				case 'languages':
					state.languages = action.payload.data;
					break;
				case 'tools':
					state.tools = action.payload.data;
					break;

				default:
					break;
			}
		},
	},
});

export const { toggle, filterAction } = filterSlice.actions;

export default filterSlice.reducer;
