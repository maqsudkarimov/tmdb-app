import * as Actions from '../actions/person';

const initialState = {
	data: {},
	isFetched: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOAD_PERSON_REQUEST:
			return {
				...state,
				data: {},
				isFetched: false
			};
		case Actions.LOAD_PERSON_SUCCESS:
			return {
				...state,
				data: action.payload,
				isFetched: true
			};
		default:
			return state;
	}
};