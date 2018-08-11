import * as Actions from '../actions/credits';

const initialState = {
	all: [],
	isFetched: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOAD_CREDITS_REQUEST:
			return {
				...state,
				all: [],
				isFetched: false
			};
		case Actions.LOAD_CREDITS_SUCCESS:
			return {
				...state,
				all: action.payload.cast,
				isFetched: true
			};
		default:
			return state;
	}
};