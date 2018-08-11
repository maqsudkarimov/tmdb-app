import * as Actions from '../actions/recommendations';

const initialState = {
	all: [],
	isFetched: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOAD_RECOMMENDATIONS_REQUEST:
			return {
				...state,
				all: [],
				isFetched: false
			};
		case Actions.LOAD_RECOMMENDATIONS_SUCCESS:
			return {
				...state,
				all: action.payload,
				isFetched: true
			};
		default:
			return state;
	}
};