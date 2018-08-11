import * as Actions from '../actions/system';

const initialState = {
	currentLangID: 1,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case Actions.CHANGE_LANGUAGE:
			return {
				...state,
				currentLangID: action.payload
			};
		default:
			return state;
	}
};